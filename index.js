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

var firebaseRef = new Firebase("https://harpoon.firebaseio.com/");

var port = process.env.PORT || 8080;

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
	if(token){
		var path = "users/"+token+"/templates/"+req.params.title+"/code";
		firebaseRef.child(path).once("value", function (snap) {
			var data = snap.val();
			if(data){
				data = dummyjson.parse(data);
				res.send(data);
			}
			else{
				res.send("{}");
			}
		});
	}
	else{
		res.status(403).send("Missing required header.");
	}
});
app.post("/generate", function (req, res) {
	var data = dummyjson.parse(req.body.template);
	res.send(data);
});

http.listen(port, "0.0.0.0", function () {
	console.log('Harpoon server running on localhost:' + port);
});
