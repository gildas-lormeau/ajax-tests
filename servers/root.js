var express = require("express");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../root-site");
var app = express();

app.use(express["static"](staticDirectory));

module.exports = app;