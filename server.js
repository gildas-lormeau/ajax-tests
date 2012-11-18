var express = require("express");
var winston = require('winston');
var util = require("util");
require("winston-loggly");

var expressLevel = {
    levels: {
        info: 0
    },
    colors: {
        info: "green"
    }
};

var expressLogger = new(winston.Logger)({
    levels: expressLevel.levels
});
expressLogger.write = function(log) {
    expressLogger.info(JSON.parse(log));
};

express.logger.token('headers', function(req, res){ return JSON.stringify(req.headers); });

//winston.write = winston.silly;
var app = express();
app.use(express.logger({
    stream: expressLogger,
    format: '{"date" : ":date", "method" : ":method", "http-version" : ":http-version", "status" : ":status", "resource" : ":url", "referrer" : ":referrer", "headers" : :headers}'
}));
app.configure("development", function() {
    expressLogger.add(winston.transports.Console, {
        level: "info"
    });
    expressLogger.add(winston.transports.Loggly, {
        inputToken: "939d6837-96a8-4535-934b-03d4dbbe1534",
        subdomain: "brojax",
        json: true,
        level: "info"
    });
    app.use(express.vhost("pure-html.local", require("./servers/pure-html.js")));
    app.use(express.vhost("mixed-ajax-html.local", require("./servers/mixed-ajax-html.js")));
    app.use(express.vhost("mixed-ajax-json.local", require("./servers/mixed-ajax-json.js")));
    app.use(express.vhost("mixed-noajax-html.local", require("./servers/mixed-noajax-html.js")));
    app.use(express.vhost("mixed-noajax-json.local", require("./servers/mixed-noajax-json.js")));
    app.use(express.vhost("pure-ajax-json.local", require("./servers/pure-js.js")));
    app.use(express.vhost("snapshot-hashbang.local", require("./servers/hash-bang.js")));
    app.use(express.vhost("snapshot-pushstate.local", require("./servers/pushstate.js")));
    app.listen(3000);
});

app.configure("production", function() {
    expressLogger.add(winston.transports.Loggly, {
        inputToken: "40a3143b-2575-4054-9af0-5461df3980df",
        subdomain: "brojax",
        json: true,
        level: "info"
    });
    app.use(express.vhost("willy-denzey.fanclub.herokuapp.com", require("./servers/pure-html.js")));
    app.use(express.vhost("alizee.fanclub.herokuapp.com", require("./servers/mixed-ajax-html.js")));
    app.use(express.vhost("booba.fanclub.herokuapp.com", require("./servers/mixed-ajax-json.js")));
    app.use(express.vhost("etienne-daho.fanclub.herokuapp.com", require("./servers/mixed-noajax-html.js")));
    app.use(express.vhost("jenifer.fanclub.herokuapp.com", require("./servers/mixed-noajax-json.js")));
    app.use(express.vhost("coeur-de-pirate.fanclub.herokuapp.com", require("./servers/pure-js.js")));
    app.use(express.vhost("nolwenn-leroy.fanclub.herokuapp.com", require("./servers/hash-bang.js")));
    app.use(express.vhost("billy-crawford.fanclub.herokuapp.com", require("./servers/pushstate.js")));
    app.listen(process.env.PORT || 5000);
});