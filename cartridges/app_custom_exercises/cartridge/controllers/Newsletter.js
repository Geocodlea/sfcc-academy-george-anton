"use strict";

var server = require("server");

var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Transaction = require("dw/system/Transaction");
var URLUtils = require("dw/web/URLUtils");
var Resource = require("dw/web/Resource");

server.get("Show", function(req, res, next) {
    var profileForm = server.forms.getForm("newsletter");
    profileForm.clear();

    res.render("newsletter/newsletter", {
        profileForm: profileForm,
        actionUrl: URLUtils.url("Newsletter-SubmitForm").toString(),
        subscriptionUrl: URLUtils.url("Newsletter-Subscription").toString()
    });

    next();
});

server.post("SubmitForm", function(req, res, next) {
    var collections = require("*/cartridge/scripts/util/collections");

    var profileForm = req.form;

    res.json({ profileForm: profileForm });

    next();
});

server.get("Subscription", function(req, res, next) {
    var email = req.querystring.email;
    var firstname = req.querystring.fname;
    var lastname = req.querystring.lname;

    var id = email;
    var object = CustomObjectMgr.getCustomObject("NewsletterSubscription", id);

    if (!object) {
        Transaction.wrap(function() {
            object = CustomObjectMgr.createCustomObject("NewsletterSubscription", id);
            object.custom.firstName = firstname;
            object.custom.lastName = lastname;
        });
    }

    res.render("home/homePage");

    next();
});

module.exports = server.exports();
