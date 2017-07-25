var EventsWebServices = {
    getByParams: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/search';
        url += location.search ? location.search : '';

        jQuery.ajax({
            dataType: 'json',
            type: 'GET',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            }, 
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
    getById: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/get';
        url += location.search ? location.search : '';

        jQuery.ajax({
            dataType: 'json',
            type: 'GET',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            }, 
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
    create: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/create';

        jQuery.ajax({
            dataType: 'json',
            type: 'POST',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            },
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
    update: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/update';

        jQuery.ajax({
            dataType: 'json',
            type: 'POST',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            },
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
    delete: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/delete';

        jQuery.ajax({
            dataType: 'json',
            type: 'POST',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            },
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
    buyTicket: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/buyTicket';

        jQuery.ajax({
            dataType: 'json',
            type: 'POST',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            },
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
    getEventBuyersById: function(params, callbackFunction) {
        var url = CI.baseUrl + 'events/getBuyers';
        url += location.search ? location.search : '';

        jQuery.ajax({
            dataType: 'json',
            type: 'GET',
            data: params,
            url: url,
            success: function (response) {
                if (callbackFunction !== undefined) {
                    callbackFunction(response);
                }
            }, 
            error: function (response) {
                console.log('error', arguments);
                waitingDialog.hide();
            }
        });
    },
};