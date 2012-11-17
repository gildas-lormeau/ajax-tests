var express = require("express");


var app = express();
app.use(express["static"](__dirname + "/../pure-html"));
console.log(__dirname + "../pure-html");
module.exports = app;