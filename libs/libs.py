__author__ = 'pivo'
import webapp2
from webapp2_extras import jinja2
from webapp2_extras import json
from webapp2_extras import sessions_memcache
from webapp2_extras import sessions
from google.appengine.ext import db
from google.appengine.api import memcache

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
		if self.request.host != 'pivolan.ru:8080' and self.request.host != 'bereg-china.ru':
			exit()

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
