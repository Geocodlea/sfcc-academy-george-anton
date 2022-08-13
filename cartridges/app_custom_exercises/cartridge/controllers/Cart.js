"use strict";

var server = require("server");
server.extend(module.superModule);

server.append("Show", function(req, res, next) {
    var Service = require("*/cartridge/services/Curs");
    var defaultCurrency = dw.system.Site.getCurrent().getDefaultCurrency();
    var viewData = res.getViewData();

    var result = Service.service.call(defaultCurrency);

    if (result.status == "OK") {
        viewData.curs = result.object;
    }

    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();
