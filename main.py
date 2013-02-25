#!/usr/bin/env python
# -*- coding: utf8 -*-
from libs.libs import WSGIApplication, BaseHandler
from libs.BeautifulSoup import BeautifulStoneSoup, Tag
from libs.pyquery.pyquery import PyQuery as pq
import re

config = {}
config['webapp2_extras.sessions'] = {
	'secret_key': '321ertrere5',
}
app = WSGIApplication(debug=False,
                      config=config)

@app.route('/')
class UserList(BaseHandler):
	def get(self):
		return self.render_response('page/main.html')

#@app.route('/termoplastavtomat-<model>')
#class UserList(BaseHandler):
#	def get(self, model):
#		return self.render_response('tpa/%s.html' % model)

@app.route('/table')
class Table(BaseHandler):
	def post(self):
		rv = self.request.POST['txt']
		html = BeautifulStoneSoup(rv, convertEntities=BeautifulStoneSoup.HTML_ENTITIES)

		[tag.extract() for tag in html.findAll(['title', 'head'])]

		#clean all p tags in table
		table = html.find('table')
		if table:
			[tag.replaceWith(tag.renderContents()) for tag in table.findAll('span')]
			[tag.replaceWith(tag.renderContents()) for tag in table.findAll('p')]

		[tag.extract() for tag in html.findAll('a')]
		for tag in html.findAll('span', style=re.compile("text-decoration:underline")):
			tag.name = 'a'
		for tag in html.findAll('span', style=re.compile("font-style:italic;")):
			tag.name = 'em'
		for tag in html.findAll('span', style=re.compile("font-weight:bold")):
			tag.name = 'strong'
			tag.attrs = []
		for tag in html.findAll('p'):
			for title in tag.findAll(text=re.compile("H2 ")):
				tag.name = 'h2'
				tag.string = title.replace('H2', '').strip()
			for title in tag.findAll(text=re.compile("H3 ")):
				tag.name = 'h2'
				tag.string = title.replace('H3', '').strip()
			for title in tag.findAll(text=re.compile("Title.*")):
				tag.replaceWith(tag.renderContents())


		#clean all span tags
		[tag.replaceWith(tag.renderContents()) for tag in html.findAll('span')]
		#set header to table, and th tags instead of td for titles
		for tr in html.findAll('tr'):
			tr.find('td').name = 'th'
		if html.find('tr'):
			for td in html.find('tr').findAll('td'):
				td.name = 'th'
			thead = Tag(html, name='thead')
			thead.insert(0, html.find('tr'))
			html.find('table').insert(0, thead)
		#erase all attrs for all tags
		for tag in html.findAll(True):
			tag.attrs = []

		for tag in html.findAll('img'):
			tag.attrs = [('src', ''), ('alt', 'tpa')]

		for tag in html.findAll('a'):
			tag.attrs = [('href', '')]
		if html.body:
			html = html.body
		return self.render_response('pages/table.html',
		                            html=html.renderContents().replace('</img>', '').replace('<p></p>', '').decode(
			                            'utf8'))

	def get(self):
		return self.render_response('pages/table.html', html='')