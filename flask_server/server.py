import requests
from flask import Flask, render_template, url_for
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_url_path='',static_folder='build',template_folder='build')
CORS(app, resources={r'/*': {'Access-Control-Allow-Origin': '*'}})

@app.route('/api/cmd/', methods=['GET', 'POST'])
def cmd_route():
	url = 'http://flaskosa.herokuapp.com/cmd'
	req = requests.get(url)
	return req.text

@app.route('/api/cmd/<request>')
def api_route(request):
	url = 'http://flaskosa.herokuapp.com/cmd/'+ request
	req = requests.get(url)
	return req.text

@app.route('/api/cmd/ECHO/<string>')
def echo_route(string):
	url = 'http://flaskosa.herokuapp.com/cmd/ECHO/'+string
	req = requests.get(url)
	return req.text

@app.route('/api/cmd/LIM/<limit>')
def setLimit_route(limit):
	req = requests.get('http://flaskosa.herokuapp.com/cmd/LIM/'+limit)
	return req.text