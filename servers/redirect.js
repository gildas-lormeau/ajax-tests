var express = require("express");
var app = express();

app.get("*", function (req, res) {

    var url = "http://" + req.subdomains[req.subdomains.length - 1] + ".buzzmyfanclub.com" + req.originalUrl;
    res.redirect(301, url);
});

module.exports = app;