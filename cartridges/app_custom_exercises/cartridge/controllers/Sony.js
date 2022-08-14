"use strict";

var server = require("server");

server.get("Show", function(req, res, next) {
    var service = dw.svc.LocalServiceRegistry.createService("app_custom_exrcises.https.RefArch.getSony", {
        createRequest: function(svc, args) {
            svc.setRequestMethod("GET");
        },
        parseResponse: function(svc, response) {
            return JSON.parse(response.text);
        }
    });

    var result = service.call();

    if (result.status == "OK") {
        var productIds = result.object.hits;
    }

    res.render("sony", { productIds: productIds });
    return next();
});

module.exports = server.exports();
