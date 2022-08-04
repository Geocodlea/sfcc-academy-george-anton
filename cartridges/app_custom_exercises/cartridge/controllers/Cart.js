"use strict";

var server = require("server");
var controller = require("app_storefront_base/cartridge/controllers/Cart");

server.extend(controller);

server.append("Show", function(req, res, next) {
    var Basket = require("dw/order/BasketMgr");
    var totalPrice = Basket.currentBasket.totalGrossPrice;

    var viewData = res.getViewData();
    viewData.price = totalPrice;

    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
