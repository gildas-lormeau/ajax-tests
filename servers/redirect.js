var express = require("express");
var app = express();

app.get("*", function(req, res) {
	var subdomain = req.subdomains[req.subdomains.length - 1];
	var url = "http://" + (subdomain == "fanclub" ? "www.buzzmyfanclub.com" : subdomain + "." + "buzzmyfanclub.com") + req.originalUrl;
	res.redirect(301, url);
});

module.exports = app;
