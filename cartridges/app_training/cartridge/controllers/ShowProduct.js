"use strict";

var server = require("server");

server.get("Start", function(req, res, next) {
    var ProductMgr = require("dw/catalog/ProductMgr");

    // const id = ProductMgr.getProduct("P0048M");

    var myProduct = req.querystring.pid;
    res.render("product/productfound", { myProduct: myProduct });
    return next();
});

module.exports = server.exports();
