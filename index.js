var request = require('request');
var querystring = require("querystring");
var VERSION = "1.1"

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
    this._request("post", "/protected/json/users/delete/" + querystring.escape(id), {}, callback);
};

Authy.prototype.user_status = function (id, callback) {
    this._request("get", "/protected/json/users/" + querystring.escape(id) + "/status", {}, callback);
};

Authy.prototype.verify = function (id, token, force, callback) {
    var qs = {};

    if (arguments.length > 3) {
        qs.force = force;
    } else {
        callback = force;
    }

    cleanToken = String(token).replace(/\D/g, "").substring(0, 16)

    if (cleanToken === '' || cleanToken == null) {
        callback(new Error("argument 'token' cannot be empty, null, or undefined"));
        return;
    }

    // Overwrite the default body to check the response.
    check_body_callback = function(err, res) {
        if(!err && res.token != "is valid") {
            err = {
                message: "Unknown API response."
            }
            res = null
        }
        callback(err, res)
    }
    this._request("get", "/protected/json/verify/" + querystring.escape(cleanToken) + "/" + querystring.escape(id), {}, check_body_callback, qs);
};

Authy.prototype.request_sms = function (id, force, callback) {
    var qs = {};

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        callback = force;
    }

    this._request("get", "/protected/json/sms/" + querystring.escape(id), {}, callback, qs);
};

Authy.prototype.request_call = function (id, force, callback) {
    var qs = {};

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        callback = force;
    }

    this._request("get", "/protected/json/call/" + querystring.escape(id), {}, callback, qs);
};

Authy.prototype.phones = function() {
    self = this;
    return {
        verification_start: function(phone_number, country_code, params, callback) {
            if (arguments.length == 3) {
                callback = params;
                params = {}
            } else if (typeof params !== "object") {
                params = {via: params}
            }

            options = {
                phone_number: phone_number,
                country_code: country_code,
                via: params.via || "sms",
                locale: params.locale,
                custom_message: params.custom_message,
                code_length: params.code_length,
                custom_code: params.custom_code
            };

            options = Object.assign(options, params);

            self._request("post", "/protected/json/phones/verification/start", options, callback);
        },

        verification_check: function(phone_number, country_code, verification_code, callback) {
            options = {
                phone_number: phone_number,
                country_code: country_code,
                verification_code: verification_code
            };
            self._request("get", "/protected/json/phones/verification/check", options, callback);
        },

        verification_status: function(phone_number, country_code, callback) {
          options = {
            phone_number: phone_number,
            country_code: country_code,
          };
          self._request("get", "/protected/json/phones/verification/status", options, callback);
        },

        info: function(phone_number, country_code, callback) {
            options = {
                phone_number: phone_number,
                country_code: country_code
            };
            self._request("get", "/protected/json/phones/info", options, callback);
        }
    };
};

Authy.prototype.check_approval_status= function (uuid,callback){
    var url="/onetouch/json/approval_requests/"+uuid;
    this._request("get", url, {}, callback);
};

Authy.prototype.send_approval_request= function (id,user_payload,hidden_details,logos,callback){
    var url="/onetouch/json/users/"+querystring.escape(id)+"/approval_requests";

    var message_parameters = {
        "message": user_payload.message,
        "details": user_payload.details || {},
        "hidden_details": hidden_details || {}
    };

    // only add logos if provided
    if(logos){
        message_parameters['logos'] = logos;
    }

    // only add expiration time if provided
    if(user_payload.seconds_to_expire){
        message_parameters['seconds_to_expire'] = user_payload.seconds_to_expire;
    }

    this._request("post", "/onetouch/json/users/"+querystring.escape(id)+"/approval_requests", message_parameters, callback);

};

Authy.prototype._request = function(type, path, params, callback, qs) {
    qs = qs || {}
    qs['api_key'] = this.apiKey;

    user_agent = "AuthyNode/"+VERSION+" (node "+process.version+")"
    headers = {
        "User-Agent": user_agent
    }

    options = {
        url: this.apiURL + path,
        form: params,
        headers: headers,
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
