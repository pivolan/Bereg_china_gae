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
		return self.render_response('main.html')
