var request = require('request');

module.exports = function (api_key, api_url) {
    return new Authy(api_key, api_url);
};

function Authy(apiKey, api_url) {
    this.apiKey = apiKey;
    this.apiURL = api_url || "https://api.authy.com";
}

Authy.prototype.register_user = function (email, cellphone, country_code, callback) {
    var country = "1";
    if (arguments.length > 3) {
        country = country_code;
    } else {
        callback = country_code;
    }

    request.post({
        url: this.apiURL + "/protected/json/users/new",
        form: {
            "user[email]": email,
            "user[cellphone]": cellphone,
            "user[country_code]": country
        },
        qs: {
            api_key: this.apiKey
        },
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if(res.statusCode === 200) {
                callback(null, toJSON(body));
            } else {
                callback(toJSON(body));
            }
        } else {
            callback(err);
        }
    });
};

Authy.prototype.delete_user = function (id, callback) {
    request.post({
        url: this.apiURL + "/protected/json/users/delete/" + id,
        qs: {
            api_key: this.apiKey
        },
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if(res.statusCode === 200) {
                callback(null, toJSON(body));
            } else {
                callback(toJSON(body));
            }
        } else {
            callback(err);
        }
    });
};

Authy.prototype.verify = function (id, token, force, callback) {
    var qs = {
        api_key: this.apiKey
    };

    if (arguments.length > 3) {
        qs.force = force; 
    } else {
        callback = force;
    }

    request.get({
        url: this.apiURL + "/protected/json/verify/" + token + "/" + id,
        qs: qs,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, toJSON(body));
            } else {
                callback(toJSON(body));
            }
        } else {
            callback(err);
        } 
    });
};

Authy.prototype.request_sms = function (id, force, callback) {
    var qs = {
        api_key: this.apiKey
    };

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        callback = force;
    }

    request.get({
        url: this.apiURL + "/protected/json/sms/" + id,
        qs: qs,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, toJSON(body));
            } else {
                callback(toJSON(body));
            }
        } else {
            callback(err);
        }
    });
};

Authy.prototype.request_call = function (id, force, callback) {
    var qs = {
        api_key: this.apiKey
    };

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        callback = force;
    }

    request.get({
        url: this.apiURL + "/protected/json/call/" + id,
        qs: qs,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, toJSON(body));
            } else {
                callback(toJSON(body));
            }
        } else {
            callback(err);
        }
    });
};

// Utility functions. Should live somewhere else probably.
function isJSON(data) {
    if (typeof data === 'object') return true;
    try {
        data = JSON.parse(data);
        return true;
    } catch (e) {
        return false;
    }
}

function toJSON(data) {
    if (typeof data === 'object') return data;
    try {
        data = JSON.parse(data);
        return data;
    } catch (e) {
        return data;
    }
}
