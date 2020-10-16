from flask import Flask,request
from pathlib import Path
from flask import jsonify
import json
from flask_cors import CORS
####mongoDB#####
import pymongo,os,requests

app = Flask(__name__,static_url_path='')
cors = CORS(app,supports_credentials=True)

@app.route("/login")
def login():
	url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx45cadecb327e4c7f&secret=055898e3126d917dfcebc62f5d21b49c&js_code="
	url_end = "&grant_type=authorization_code"
	result = {}
	getArgs = request.args    #获取询问参数
	js_code = getArgs.get("js_code")
	url += js_code + url_end
	info = requests.get(url)
	return_jscode2session = info.json()
	result["openId"] = return_jscode2session["openid"]
	return json.dumps(result,ensure_ascii=False).encode("utf-8")





if __name__ == "__main__":
  app.run("0.0.0.0",80,debug=True)