"use strict";

var server = require("server");

var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Transaction = require("dw/system/Transaction");
var URLUtils = require("dw/web/URLUtils");
var Resource = require("dw/web/Resource");
var CouponMgr = require("dw/campaign/CouponMgr");

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
    importPackage(dw.net);
    importPackage(dw.system);
    var Coupon = CouponMgr.getCoupon("$20 off");

    function sendMail(mailTo, mailFrom, firstName, lastName, couponCode) {
        var mail = new dw.net.Mail();
        mail.addTo(mailTo);
        mail.setFrom(mailFrom);
        mail.setSubject("Newsletter Sign Up");
        mail.setContent(
            `<html>
              <head>
                <title>Newsletter</title></head>
                  <body>
                    <h1>Dear ${firstName} ${lastName}, thanks for signing up to receive our newsletter.</h1>
                    <p>Starting today you will receive our newsletter.</p>
                    <b>${couponCode}</b>
                  </body>
             </html>`,
            "text/html",
            "UTF-8"
        );
        mail.send();
    }

    var profileForm = server.forms.getForm("newsletter");

    var id = profileForm.customer.email.value;
    var object = CustomObjectMgr.getCustomObject("NewsletterSubscription", id);
    var formResponse = "";

    if (!object) {
        Transaction.wrap(function() {
            object = CustomObjectMgr.createCustomObject("NewsletterSubscription", id);
            object.custom.firstName = profileForm.customer.firstname.value;
            object.custom.lastName = profileForm.customer.lastname.value;

            var nextUnissuedCoupon = Coupon.getNextCouponCode();
            object.custom.couponCode = nextUnissuedCoupon;

            if (nextUnissuedCoupon) {
                var couponCodeEmailMessage = `This is your coupon code: ${nextUnissuedCoupon}`;
            } else {
                var couponCodeEmailMessage = "Sorry, there are no more coupon codes left.";
            }

            sendMail(
                "geocodlea@yahoo.com",
                "noreply@dsalesforce.com",
                profileForm.customer.firstname.value,
                profileForm.customer.lastname.value,
                couponCodeEmailMessage
            );
        });
        formResponse = "created";
    } else {
        formResponse = "error";
    }

    res.render("newsletter/newsletter", {
        profileForm: profileForm,
        actionUrl: URLUtils.url("Newsletter-SubmitForm").toString(),
        formResponse: formResponse
    });

    next();
});

module.exports = server.exports();
