"use strict";

var server = require("server");
var controller = require("app_storefront_base/cartridge/controllers/Product");

server.extend(controller);

server.append("Show", function(req, res, next) {
    var ProductSearchModel = require("dw/catalog/ProductSearchModel");
    var ProductSearch = require("*/cartridge/models/search/productSearch");
    var CatalogMgr = require("dw/catalog/CatalogMgr");
    var ProductMgr = require("dw/catalog/ProductMgr");
    var sortingRule = CatalogMgr.getSortingRule("price-low-to-high");

    var viewData = res.getViewData();

    var productID = req.querystring.pid;
    var product = ProductMgr.getProduct(productID);
    var cgid = product.categories[0].ID;

    viewData.cgid = cgid;
    viewData.srule = sortingRule.ID;

    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();
