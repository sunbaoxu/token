(function(win){
	"use strict"; //以严格模式

	function Token(opts){
		//重置
		this.obj = this.extend({ phone:''},opts);
		//手机号
		this.phone = this.obj.phone;
		//token
		this.sJWT= '';
		//头部
		this.oHeader = {alg: 'HS256', typ: 'JWT'};
		//主体
		this.oPayload = {};
		//初始化
		this.init();
	}

	Token.prototype = {
		init () {
			//oPayload
			this.payloadFn();
			//sJWT
			this.sjwtFn();
		},
		//重置
		extend(_defult,opts) {
			for(let m in opts){
				_defult[m]=opts[m]
			}
			return _defult;
		},
		//date
		dateFn () {
			return Number(Math.random().toString().substr(3) + Date.now()).toString(36);
		},
		//oPayload
		payloadFn () {
		  var tNow = KJUR.jws.IntDate.get('now');
		  var tEnd = KJUR.jws.IntDate.get('now + 1day');
		  //jwt签发者
		  this.oPayload.iss = "http://foo.com";
		  //jwt所面向的用户
		  this.oPayload.sub = "mailto:mike@foo.com";
		  this.oPayload.nbf = tNow;
		  this.oPayload.iat = tNow;
		  this.oPayload.exp = tEnd;
		  //jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
		  this.oPayload.jti = this.phone+this.dateFn();
		  this.oPayload.aud = "http://foo.com/employee";
		},
		//sJWT
		sjwtFn () {
			var sHeader = JSON.stringify(this.oHeader);
		  var sPayload = JSON.stringify(this.oPayload);
		  // console.log(KJUR.jws.JWS.sign)
		  this.sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "sunbaoxu1993");
		}
	}

	win.Token = Token;
})(window)