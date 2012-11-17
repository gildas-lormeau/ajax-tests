var express = require("express");
var staticDirectory = __dirname + "../pure-js";
var app = express();

app.use(express["static"](staticDirectory));

app.get("/discography", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});

app.get("/biography", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});
module.exports = app;