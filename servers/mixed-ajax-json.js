var express = require("express");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../mixed-ajax-json");
var app = express();

app.use(express["static"](staticDirectory));

app.get("/albums", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});

app.get("/singles", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});

app.get("/biography", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});
module.exports = app;