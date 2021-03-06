var express = require("express");
var request = require("request");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../snapshot-hashbang");
var app = express();

app.use(function(req, res, next) {
    console.log(req.url);
    if(req.url.indexOf("_escaped_fragment_") != -1) {
        // var headers = {
        //     authorization: "5debf07f5280cf43ac6da4eb70a72bbf"
        // };
        // headers["x-domain"] = "http://nolwenn-leroy.buzzmyfanclub.com";
        var reqUrl = "http://api.seo4ajax.com/5debf07f5280cf43ac6da4eb70a72bbf";
        reqUrl += req.url;
        request.get({
            url: reqUrl//,
            //headers: headers
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