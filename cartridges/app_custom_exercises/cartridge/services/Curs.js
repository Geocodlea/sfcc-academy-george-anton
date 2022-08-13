/**
 * @description - service to get converter soap
 */
exports.service = dw.svc.LocalServiceRegistry.createService("app_custom_exrcises.soap.curencyConverter.get", {
    initServiceClient: function() {
        this.webReference = webreferences2.Curs;
        this.serviceClient = this.webReference.getDefaultService();
        return this.serviceClient;
    },
    createRequest: function(service, params) {
        return this.serviceClient.getlatestvalue(params);
    },
    execute: function(service, request) {
        return request;
    }
});
