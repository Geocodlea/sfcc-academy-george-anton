"use strict";

var server = require("server");

server.get("Show", function(req, res, next) {
    var Service = require("./FlickrServiceRegistryGet");
    var service = Service.Get("app_custom_exrcises.https.flickr.getRecentPhotos", {
        createRequest: function(svc, args) {
            svc.setRequestMethod("GET");
        },
        parseResponse: function(svc, client) {
            return client;
        }
    });

    var result = service.call();
    var photosURL = [];

    if (result.status == "OK") {
        var photos = JSON.parse(result.object.text).photos.photo;
        var url = "https://live.staticflickr.com/";
        for (let i = 0; i < photos.length; i++) {
            photosURL.push(url + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + ".jpg");
        }
    }

    res.render("flickr", { photosURL: photosURL });

    return next();
});

module.exports = server.exports();
