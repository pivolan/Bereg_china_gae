#!/usr/bin/env python
# -*- coding: utf8 -*-
import webapp2
from webapp2_extras import jinja2
from webapp2_extras import json
from webapp2_extras import sessions_memcache
from webapp2_extras import sessions
from google.appengine.ext import db
from google.appengine.api import memcache


class WSGIApplication(webapp2.WSGIApplication):
	def __init__(self, *args, **kwargs):
		super(WSGIApplication, self).__init__(*args, **kwargs)
		self.router.set_dispatcher(self.__class__.custom_dispatcher)

	@staticmethod
	def custom_dispatcher(router, request, response):
		rv = router.default_dispatcher(request, response)
		if isinstance(rv, basestring):
			rv = webapp2.Response(rv)
		elif isinstance(rv, tuple):
			rv = webapp2.Response(*rv)

		return rv

	def route(self, *args, **kwargs):
		def wrapper(func):
			self.router.add(webapp2.Route(handler=func, *args, **kwargs))
			return func

		return wrapper

config = {}
config['webapp2_extras.sessions'] = {
	'secret_key': 'my-super-secret-key',
}
app = WSGIApplication(debug=True,
                      config=config)

class BaseHandler(webapp2.RequestHandler):
	@webapp2.cached_property
	def jinja2(self):
		# Returns a Jinja2 renderer cached in the app registry.
		return jinja2.get_jinja2(app=self.app)

	def render_response(self, _template, **context):
		# Renders a template and writes the result to the response.
		rv = self.jinja2.render_template(_template, **context)
		self.response.write(rv)

	def render_json(self, _json):
		self.response.headers['Content-Type'] = 'application/json'
		self.response.out.write(json.encode(_json))

	def dispatch(self):
		# Get a session store for this request.
		self.session_store = sessions.get_store(request=self.request)

		try:
			# Dispatch the request.
			webapp2.RequestHandler.dispatch(self)
		finally:
			# Save all sessions.
			self.session_store.save_sessions(self.response)

	@webapp2.cached_property
	def session(self):
		# Returns a session using the default cookie key.
		return self.session_store.get_session(name='mc_session',
		                                      factory=sessions_memcache.MemcacheSessionFactory)


@app.route('/')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('main.html', persons=Person.all())


@app.route('/user/add/<name>/<description>')
class UserAdd(BaseHandler):
	def get(self, name, description):
		user = Person(name=name.decode('utf8'), description=description.decode('utf8'))
		user.save()
		return self.render_json(user.key().id())


@app.route('/user/<user_id>/comments')
class UserComments(BaseHandler):
	def get(self, user_id):
		user = Person.get_by_id(int(user_id))
		comments = {}
		for comment in user.comment_set:
			comments[comment.key().id()] = {'rate': comment.rate,
			                                'text': comment.text,
			                                'comments': {}}
			if comment.comment_set:
				for s2 in comment.comment_set:
					comments[comment.key().id()]['comments'][s2.key().id()] = {'rate': s2.rate,
					                                                           'text': s2.text}
		return self.render_json(comments)


@app.route('/comment/user/<user_id:\d+>/<text>')
class CommentAddUser(BaseHandler):
	def get(self, user_id, text):
		user = Person().get_by_id(int(user_id))
		comment = Comment()
		comment.text = text.decode('utf8')
		comment.link = user
		comment.save()
		return self.render_json([user_id, text, comment.key().id(), comment.text])


@app.route('/comment/<comment_id:\d+>/<text>')
class CommentAddComment(BaseHandler):
	def get(self, comment_id, text):
		comment = Comment().get_by_id(int(comment_id))
		comment_new = Comment(link=comment, text=text.decode('utf8'))
		comment_new.save()
		return self.render_json('ok')

#region rating
@app.route('/rate/user/<user_id>/inc')
class UserIncreaseRate(BaseHandler):
	def get(self, user_id):
		user = Person().get_by_id(int(user_id))
		Rate().inc(user, self.session)
		return self.render_json(user.rate)


@app.route('/rate/user/<user_id>/dec')
class UserDecreaseRate(BaseHandler):
	def get(self, user_id):
		user = Person().get_by_id(int(user_id))
		Rate().dec(user, self.session)
		return self.render_json(user.rate)


@app.route('/rate/comment/<comment_id>/inc')
class commentIncreaseRate(BaseHandler):
	def get(self, comment_id):
		comment = Comment().get_by_id(int(comment_id))
		Rate().inc(comment, self.session)
		return self.render_json(comment.rate)


@app.route('/rate/comment/<comment_id>/dec')
class commentDecreaseRate(BaseHandler):
	def get(self, comment_id):
		comment = Comment().get_by_id(int(comment_id))
		Rate().dec(comment, self.session)
		return self.render_json(comment.rate)

#endregion


class RatingPage(BaseHandler):
	def get(self):
		link_id = int(self.request.get('id'))
		type = self.request.get('type')
		action = self.request.get('action')
		value = 0
		if action == '-':
			value = -1
		elif action == '+':
			value = 1
		rate = 0
		is_rated = self.session.get('is_rated', {})
		if type == 'comment':
			comment = Comment.get_by_id(link_id)
			if comment and not type + str(link_id) in is_rated:
				comment.rate += value
				comment.save()
				is_rated[type + str(link_id)] = True
				self.session['is_rated'] = is_rated
				rate = comment.rate
			else:
				return self.render_json(is_rated)
		elif type == 'person':
			person = Person.get_by_id(link_id)
			if person and (not type + str(link_id) in is_rated):
				person.rate += value
				person.save()
				is_rated[type + str(link_id)] = True
				self.session['is_rated'] = is_rated
				rate = person.rate
			else:
				return self.render_json(is_rated)
		self.render_json(rate)

"""
Models
"""

class Comment(db.Model):
	author = db.UserProperty()
	link = db.ReferenceProperty()
	text = db.StringProperty(multiline=True)
	date = db.DateTimeProperty(auto_now_add=True)
	rate = db.IntegerProperty(default=0)


class Person(db.Model):
	name = db.StringProperty()
	description = db.StringProperty(multiline=True)
	rate = db.IntegerProperty(default=0)


class Rate():
	def inc(self, obj, session):
		self._change(obj, 1, session)

	def dec(self, obj, session):
		self._change(obj, -1, session)

	def _change(self, obj, value, session):
		if isinstance(obj, (Comment, Person)):
			type = obj.__class__.__name__
			key = type + str(obj.key().id())
			if key not in session:
				obj.rate += value
				obj.save()
			session[key] = True
