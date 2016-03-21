/**
 * Created by Jayant Bhawal on 19-03-2016.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var compression = require('compression');
var dream = require ('dreamjs');

var port = process.env.PORT || 8080;

app.use(compression({level: 6}));	//6 is default

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/app/index.html");
});

http.listen(port, "0.0.0.0", function () {
	console.log('Harpoon server running on localhost:' + port);
});
