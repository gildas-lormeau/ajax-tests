var express = require("express");
var request = require("request");
var staticDirectory = __dirname + "../pure-js";
var app = express();

app.use(function(req, res, next) {
    if(req.url.indexOf("_escaped_fragment_") != -1) {
        var headers = {
            authorization: "56cb278f7815e0d5e83d2bcfbe35286d"
        };
        headers["x-domain"] = "http://appcharts.cloudfoundry.com";
        var reqUrl = "http://brojax-development-api.aws.af.cm/";
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

app.get("/discography", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});

app.get("/biography", function(req, res, next) {
    res.sendfile(staticDirectory + "/index.html");
});
module.exports = app;