var request = require('request');

module.exports = function (api_key, api_url) {
    return new Authy(api_key, api_url);
};

function Authy(apiKey, api_url) {
    this.apiKey = apiKey;
    this.apiURL = api_url || "https://api.authy.com";
}

Authy.prototype.register_user = function (email, cellphone, country_code, send_sms_install_link, callback) {
    var country = "1";
    var send_install_link = true;
    if (arguments.length > 4) {
        country = country_code;
        send_install_link = send_sms_install_link;
    }
    else if (arguments.length == 4) {
        callback = send_sms_install_link;
        if (typeof country_code == "boolean") {
            send_install_link = country_code;
        }
        else {
            country = country_code;
        }
    }
    else {
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
            api_key: this.apiKey,
            send_install_link_via_sms: send_install_link
        },
        json: true,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if(res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
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
        json: true,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if(res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
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
        json: true,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
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
        json: true,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
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
        json: true,
        jar: false,
        strictSSL: true
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
            }
        } else {
            callback(err);
        }
    });
};

Authy.prototype.phones = function() {
    self = this;
    return {
        verification_start: function(options, callback) {
            options = options || {}
            request.post({
                url: self.apiURL + "/protected/json/phones/verification/start",
                form: options,
                qs: {
                    api_key: self.apiKey
                },
                json: true,
                jar: false,
                strictSSL: true
            }, function (err, res, body) {
                if (!err) {
                    if(res.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(body);
                    }
                } else {
                    callback(err);
                }
            });
        },

        verification_check: function(options, callback) {
            options = options || {}
            request.get({
                url: self.apiURL + "/protected/json/phones/verification/check",
                form: options,
                qs: {
                    api_key: self.apiKey
                },
                json: true,
                jar: false,
                strictSSL: true
            }, function (err, res, body) {
                if (!err) {
                    if(res.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(body);
                    }
                } else {
                    callback(err);
                }
            });
        },

        info: function(options, callback) {
            options = options || {}
            request.get({
                url: self.apiURL + "/protected/json/phones/info",
                form: options,
                qs: {
                    api_key: self.apiKey
                },
                json: true,
                jar: false,
                strictSSL: true
            }, function (err, res, body) {
                if (!err) {
                    if(res.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(body);
                    }
                } else {
                    callback(err);
                }
            });
        }
    };
};
