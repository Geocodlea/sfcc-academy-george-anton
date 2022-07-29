"use strict";

var server = require("server");

server.get("RenderTemplate", function(req, res, next) {
    res.render("product/testrender");
    return next();
});

server.get("TestRemoteInclude", function(req, res, next) {
    res.render("product/template2");
    return next();
});

server.get("TestDecorator", function(req, res, next) {
    res.render("training/testdecorator");
    return next();
});

module.exports = server.exports();
