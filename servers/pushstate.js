var express = require("express");
var request = require("request");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../snapshot-pushstate");
var app = express();

app.use(function(req, res, next) {
    console.log(req.url);
    if(req.url.indexOf("_escaped_fragment_") != -1) {
        // var headers = {
        //     authorization: "3dee3ffdcdba5c8c406c72ccf4891ee1"
        // };
        // headers["x-domain"] = "http://billy-crawford.buzzmyfanclub.com";
        var reqUrl = "http://api.seo4ajax.com/b61cd68dcf3b47bb2b82df2f514ee526";
        reqUrl += req.url;
        request.get({
            url: reqUrl//,
           // headers: headers
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

module.exports = app;