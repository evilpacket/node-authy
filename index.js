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

    this._request("post", "/protected/json/users/new", {
            "user[email]": email,
            "user[cellphone]": cellphone,
            "user[country_code]": country
        },
        callback,
        {
          send_install_link_via_sms: send_install_link
        }
    );
};

Authy.prototype.delete_user = function (id, callback) {
    this._request("post", "/protected/json/users/delete/" + id, {}, callback);
};

Authy.prototype.user_status = function (id, callback) {
    this._request("get", "/protected/json/users/" + id + "/status", {}, callback);
};

Authy.prototype.verify = function (id, token, force, callback) {
    var qs = {};

    if (arguments.length > 3) {
        qs.force = force;
    } else {
        callback = force;
    }

    this._request("get", "/protected/json/verify/" + token + "/" + id, {}, callback, qs);
};

Authy.prototype.request_sms = function (id, force, callback) {
    var qs = {};

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        callback = force;
    }

    this._request("get", "/protected/json/sms/" + id, {}, callback, qs);
};

Authy.prototype.request_call = function (id, force, callback) {
    var qs = {};

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        callback = force;
    }

    this._request("get", "/protected/json/call/" + id, {}, callback, qs);
};

Authy.prototype.phones = function() {
    self = this;
    return {
        verification_start: function(options, callback) {
            options = options || {}
            self._request("post", "/protected/json/phones/verification/start", options, callback);
        },

        verification_check: function(options, callback) {
            options = options || {}
            self._request("get", "/protected/json/phones/verification/check", options, callback);
        },

        info: function(options, callback) {
            options = options || {}
            self._request("get", "/protected/json/phones/info", options, callback);
        }
    };
};

Authy.prototype._request = function(type, path, params, callback, qs) {
    qs = qs || {}
    qs['api_key'] = this.apiKey;

    options = {
        url: this.apiURL + path,
        form: params,
        qs: qs,
        json: true,
        jar: false,
        strictSSL: true
    }

    var callback_check = function (err, res, body) {
        if (!err) {
            if(res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(body);
            }
        } else {
            callback(err);
        }
    };

    switch(type) {

        case "post":
            request.post(options, callback_check);
            break;

        case "get":
            request.get(options, callback_check);
            break;
    }
};
