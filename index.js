/**
 * Created by Jayant Bhawal on 19-03-2016.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var compression = require('compression');
var dummyjson = require('dummy-json');
var Firebase = require("firebase");
var moment = require('moment');

var firebaseRef = new Firebase("https://harpoon.firebaseio.com/");

var randomInt = function (min, max) {
	min = (typeof(min) == "number") ? min : parseInt(min);
	max = (typeof(max) == "number") ? max : parseInt(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

var parseMoment = function (str) {
	switch (str) {
		case 'now':
			return moment().format('X');
			break;
		case 'tomorrow':
			return moment().add(1, 'd').format('X');
			break;
		case 'yesterday':
			return moment().subtract(1, 'd').format('X');
			break;
		default:
			str = str.replace(/(\\"|\\')/g, function (v) {
				return v.replace("\\", "");
			});
			return eval(str);
	}
};

var generateObjectId = function () {
	var ID = (Math.random().toString(16)).substr(2, 8);
	ID += (Math.random().toString(16)).substr(2, 8);
	ID += (Math.random().toString(16)).substr(2, 8);		//24 characters
	ID += (Math.random().toString(16)).substr(2, 24 - ID.length);
	return ID;
};
var customHelpers = {
	random: function () {
		var args = Array.prototype.slice.call(arguments);
		args.pop();

		if(args.indexOf('objectId')){
			args[args.indexOf('objectId')] = generateObjectId();
		}

		if (args && args.length && Array.isArray(args)) {
			return args[Math.floor(Math.random() * args.length)];
		}
		else {
			return 0;
		}
	},
	momentstr: function () {
		var args = Array.prototype.slice.call(arguments);
		args.pop();
		if (args && args.length && Array.isArray(args)) {
			var dateStr = "";
			args.forEach(function (arg, i) {
				if (dateStr.length) {
					dateStr += " ";
				}
				dateStr += parseMoment(arg);
			});
			return dateStr;
		}
		else {
			return moment().format('X');
		}
	},
	moment: function () {
		var args = Array.prototype.slice.call(arguments);
		args.pop();
		if (args && args.length && args.length < 3 && Array.isArray(args)) {
			var dateStr = "";
			if (args.length == 1) {
				dateStr += parseMoment(args[0]);
			}
			else if (args.length == 2) {
				dateStr += randomInt(parseMoment(args[0]), parseMoment(args[1]));
			}
			return dateStr;
		}
		else {
			return moment().format('X');
		}
	},
	eval: function () {
		var args = Array.prototype.slice.call(arguments);
		args.pop();
		if (args && args.length && args.length < 3 && Array.isArray(args)) {
			var evalStr = "";
			args.forEach(function (arg, i) {
				if (evalStr.length) {
					evalStr += " ";
				}
				arg = arg.replace(/(\\"|\\')/g, function (v) {
					return v.replace("\\", "");
				});
				evalStr += eval(arg);
			});
			return evalStr;
		}
		else {
			return "nothing to eval";
		}
	},
	objectId: function () {
		return generateObjectId();
	},
	avatar: function () {
		var imageNumber = Math.round(Math.random() * 96)
		var men = "//randomuser.me/api/portraits/men/" + imageNumber + ".jpg";
		var women = "//randomuser.me/api/portraits/women/" + imageNumber + ".jpg";
		if (typeof arguments[0] == "string") {
			switch (arguments[0]) {
				case "male":
					avatar = men;
					break;
				case "female":
					avatar = women;
					break;
				//No default
			}
		}
		else {
			var avatar = (Math.round(Math.random())) ? men : women;
		}
		return avatar;
	}
	//TODO: Make a `this` helper.
};

var port = process.env.PORT || 8080;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Accept, Accept-CH, Accept-Charset, Accept-Datetime, Accept-Encoding, Accept-Ext, Accept-Features, Accept-Language, Accept-Params, Accept-Ranges, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alternates, Authentication-Info, Authorization, C-Ext, C-Man, C-Opt, C-PEP, C-PEP-Info, CONNECT, Cache-Control, Compliance, Connection, Content-Base, Content-Disposition, Content-Encoding, Content-ID, Content-Language, Content-Length, Content-Location, Content-MD5, Content-Range, Content-Script-Type, Content-Security-Policy, Content-Style-Type, Content-Transfer-Encoding, Content-Type, Content-Version, Cookie, Cost, DAV, DELETE, DNT, DPR, Date, Default-Style, Delta-Base, Depth, Derived-From, Destination, Differential-ID, Digest, ETag, Expect, Expires, Ext, From, GET, GetProfile, HEAD, HTTP-date, Host, IM, If, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Keep-Alive, Label, Last-Event-ID, Last-Modified, Link, Location, Lock-Token, MIME-Version, Man, Max-Forwards, Media-Range, Message-ID, Meter, Negotiate, Non-Compliance, OPTION, OPTIONS, OWS, Opt, Optional, Ordering-Type, Origin, Overwrite, P3P, PEP, PICS-Label, POST, PUT, Pep-Info, Permanent, Position, Pragma, ProfileObject, Protocol, Protocol-Query, Protocol-Request, Proxy-Authenticate, Proxy-Authentication-Info, Proxy-Authorization, Proxy-Features, Proxy-Instruction, Public, RWS, Range, Referer, Refresh, Resolution-Hint, Resolver-Location, Retry-After, Safe, Sec-Websocket-Extensions, Sec-Websocket-Key, Sec-Websocket-Origin, Sec-Websocket-Protocol, Sec-Websocket-Version, Security-Scheme, Server, Set-Cookie, Set-Cookie2, SetProfile, SoapAction, Status, Status-URI, Strict-Transport-Security, SubOK, Subst, Surrogate-Capability, Surrogate-Control, TCN, TE, TRACE, Timeout, Title, Trailer, Transfer-Encoding, UA-Color, UA-Media, UA-Pixels, UA-Resolution, UA-Windowpixels, URI, Upgrade, User-Agent, Variant-Vary, Vary, Version, Via, Viewport-Width, WWW-Authenticate, Want-Digest, Warning, Width, X-Content-Duration, X-Content-Security-Policy, X-Content-Type-Options, X-CustomHeader, X-DNSPrefetch-Control, X-Forwarded-For, X-Forwarded-Port, X-Forwarded-Proto, X-Frame-Options, X-Modified, X-OTHER, X-PING, X-PINGOTHER, X-Powered-By, X-Requested-With, X-Auth-Token");	//In other words, fuck it.
	next();
});

app.use(compression({level: 6}));	//6 is default
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/app/index.html");
});
app.get("/:title", function (req, res) {
	var token = req.get('X-Auth-Token');
	if (token) {
		var path = "users/" + token + "/templates/" + req.params.title + "/code";
		firebaseRef.child(path).once("value", function (snap) {
			var data = snap.val();
			if (data) {
				data = dummyjson.parse(data, {helpers: customHelpers});
				res.send(data);
			}
			else {
				res.send("{}");
			}
		});
	}
	else {
		res.status(403).send("Missing required header.");
	}
});
app.post("/generate", function (req, res) {
	var data = dummyjson.parse(req.body.template, {helpers: customHelpers});
	res.send(data);
});

http.listen(port, "0.0.0.0", function () {
	console.log('Harpoon server running on localhost:' + port);
});
