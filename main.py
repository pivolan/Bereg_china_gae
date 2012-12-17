#!/usr/bin/env python
# -*- coding: utf8 -*-
from libs.libs import WSGIApplication, BaseHandler

config = {}
config['webapp2_extras.sessions'] = {
	'secret_key': '321ertrere5',
}
app = WSGIApplication(debug=True,
                      config=config)

@app.route('/')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('pages/main.html')


@app.route('/proizvodstvennye-linii-iz-kitaya')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('pages/proizvodstvennye-linii-iz-kitaya.html')


@app.route('/mini-zavody-iz-kitaya')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('pages/mini-zavody-iz-kitaya.html')


@app.route('/oborudovanie-iz-kitaia')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('pages/oborudovanie-iz-kitaia.html')
