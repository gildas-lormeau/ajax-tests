var express = require("express");
var util = require("util");

var app = express();

//console.log(util.inspect(express));
 
app.configure("development", function() {
    app.use(express.vhost("pure-html.local", require("./servers/pure-html.js")));
    app.use(express.vhost("html-js-ajax-html.local", require("./servers/html-js-ajax-html.js")));
    app.use(express.vhost("html-js-ajax-json.local", require("./servers/html-js-ajax-json.js")));
    app.use(express.vhost("html-js-noajax-html.local", require("./servers/html-js-noajax-html.js")));
    app.use(express.vhost("html-js-noajax-json.local", require("./servers/html-js-noajax-json.js")));
    app.use(express.vhost("pure-js.local", require("./servers/pure-js.js")));
    app.use(express.vhost("hash-bang.local", require("./servers/hash-bang.js")));
    app.use(express.vhost("pushstate.local", require("./servers/pushstate.js")));
    app.listen(3000);
});
 
app.configure("production", function() {
    app.use(express.vhost("willy-denzey.domain.com", require("./servers/pure-html.js")));
    app.use(express.vhost("html-js-ajax-html.local", require("./servers/html-js-ajax-html.js")));
    app.use(express.vhost("html-js-ajax-json.local", require("./servers/html-js-ajax-json.js")));
    app.use(express.vhost("html-js-noajax-html.local", require("./servers/html-js-noajax-html.js")));
    app.use(express.vhost("html-js-noajax-json.local", require("./servers/html-js-noajax-json.js")));
    app.use(express.vhost("pure-js.local", require("./servers/pure-js.js")));
    app.use(express.vhost("hash-bang.local", require("./servers/hash-bang.js")));
    app.use(express.vhost("pushstate.local", require("./servers/pushstate.js")));
    app.listen(80);
});
