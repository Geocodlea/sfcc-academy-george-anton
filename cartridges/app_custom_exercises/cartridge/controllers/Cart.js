"use strict";

var server = require("server");
server.extend(module.superModule);

server.post("Mail", function(req, res, next) {
    var product = {
        pid: req.querystring.pid,
        image: req.querystring.image,
        name: req.querystring.name,
        description: req.querystring.description,
        price: req.querystring.price,
        currency: req.querystring.currency,
        quantity: req.querystring.quantity
    };

    importPackage(dw.net);
    importPackage(dw.value);
    importPackage(dw.util);
    importPackage(dw.system);

    function sendMail() {
        var template = new dw.util.Template("mail/mail");

        var o = new dw.util.HashMap();
        o.put("product", product);

        var text = template.render(o);

        var mail = new dw.net.Mail();
        mail.addTo("geocodlea@yahoo.com");
        mail.setFrom("noreply@salesforce.com");
        mail.setSubject("Confirmation of Your Order");
        mail.setContent(text);
        mail.send();
    }

    sendMail();

    return next();
});

module.exports = server.exports();
