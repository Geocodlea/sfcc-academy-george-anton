"use strict";

var server = require("server");

server.get("test", function(req, res, next) {
    res.render("training/vartest");
    return next();
});

module.exports = server.exports();
