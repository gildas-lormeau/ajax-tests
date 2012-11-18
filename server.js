var express = require("express");
var winston = require('winston');
var util = require("util");
require("winston-loggly");

var expressLevel = {
    levels: {
        write: 0
    },
    colors: {
        write: "green"
    }
};

var expressLogger = new(winston.Logger)({
    levels: expressLevel.levels
});


//winston.write = winston.silly;
var app = express();
app.use(express.logger({
    stream: expressLogger
}));
app.configure("development", function() {
    expressLogger.add(winston.transports.Console, {
        level: "write"
    });
    expressLogger.add(winston.transports.Loggly, {
        inputToken: "939d6837-96a8-4535-934b-03d4dbbe1534",
        subdomain: "brojax",
        json: true,
        level: "write"
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
        level: "write"
    });
    app.use(express.vhost("willy-denzey.domain.com", require("./servers/pure-html.js")));
    app.use(express.vhost("mixed-ajax-html.local", require("./servers/mixed-ajax-html.js")));
    app.use(express.vhost("mixed-ajax-json.local", require("./servers/mixed-ajax-json.js")));
    app.use(express.vhost("mixed-noajax-html.local", require("./servers/mixed-noajax-html.js")));
    app.use(express.vhost("mixed-noajax-json.local", require("./servers/mixed-noajax-json.js")));
    app.use(express.vhost("pure-js.local", require("./servers/pure-js.js")));
    app.use(express.vhost("snapshot-hashbang.local", require("./servers/hash-bang.js")));
    app.use(express.vhost("snapshot-pushstate.local", require("./servers/pushstate.js")));
    app.listen(process.env.PORT || 5000);
});