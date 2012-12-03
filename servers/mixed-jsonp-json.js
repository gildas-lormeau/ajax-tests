var express = require("express");
var fs = require("fs");
var staticDirectory = fs.realpathSync(__dirname + "/../mixed-jsonp-json");
var app = express();

var jsonFiles = {
    biography: JSON.parse(fs.readFileSync(staticDirectory + "/data/biography.json", "utf8")),
    albums: JSON.parse(fs.readFileSync(staticDirectory + "/data/albums.json", "utf8")),
    singles: JSON.parse(fs.readFileSync(staticDirectory + "/data/singles.json", "utf8"))
};

app.get("/data/:id.json?", function(req,res,next) {
    var id = req.route.params.id;
    console.log(id);
    if (jsonFiles[id]) {
        res.jsonp(jsonFiles[id]);
    }
    else {
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