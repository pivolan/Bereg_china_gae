__author__ = 'pivo'
__name__ = 'main'
@app.route('/')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('main.html')