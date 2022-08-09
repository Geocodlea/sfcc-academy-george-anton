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
        actionUrl: URLUtils.url("Newsletter-SubmitForm").toString()
    });

    next();
});

server.post("SubmitForm", function(req, res, next) {
    var profileForm = server.forms.getForm("newsletter");

    var id = profileForm.customer.email.value;
    var object = CustomObjectMgr.getCustomObject("NewsletterSubscription", id);

    if (!object) {
        Transaction.wrap(function() {
            object = CustomObjectMgr.createCustomObject("NewsletterSubscription", id);
            object.custom.firstName = profileForm.customer.firstname.value;
            object.custom.lastName = profileForm.customer.lastname.value;
        });
    }

    res.render("newsletter/newsletter", {
        profileForm: profileForm,
        actionUrl: URLUtils.url("Newsletter-SubmitForm").toString()
    });

    next();
});

module.exports = server.exports();
