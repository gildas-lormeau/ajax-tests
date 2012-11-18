var express = require("express");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../mixed-noajax-json");
var app = express();

app.use(express["static"](staticDirectory));
module.exports = app;