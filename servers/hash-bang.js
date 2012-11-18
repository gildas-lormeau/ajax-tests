var express = require("express");
var request = require("request");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../snapshot-hashbang");
var app = express();

app.use(function(req, res, next) {
    console.log(req.url);
    if(req.url.indexOf("_escaped_fragment_") != -1) {
        var headers = {
            authorization: "fed10eecf441b05153ab3ebd1780b43d"
        };
        headers["x-domain"] = "http://nolwenn-leroy.fanclub.herokuapp.com";
        var reqUrl = "http://brojax-development-api.aws.af.cm";
        reqUrl += req.url;
        request.get({
            url: reqUrl,
            headers: headers
        }).pipe(res);
    } else {
        next();
    }
});

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