var request = require('request');

module.exports = function (api_key, api_url) {
    return new Authy(api_key, api_url);
};

function Authy(apiKey, api_url) {
    this.apiKey = apiKey;
    this.apiURL = api_url || "https://api.authy.com";
};

Authy.prototype.register_user = function (email, cellphone, country_code, callback) {
    var country = "USA";
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
        }
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                callback(null, toJSON(body));
            } else {
                callback(JSON.parse(toJSON(body)));
            }
        } else {
            throw new Error(err);
        }
    });
};

Authy.prototype.verify = function (id, token, force, callback) {
    var qs = {
        api_key: apikey
    };

    if (arguments.length > 3) {
        qs.force = force; 
    } else {
        callback = force;
    }

    request.get({
        url: this.apiURL + "/protected/json/verify/" + token + "/" + id,
        qs: qs
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cb(null, toJSON(body));
            } else {
                cb(toJSON(body));
            }
        } else {
            throw new Error(err);
        } 
    });
};

Authy.prototype.request_sms = function (id, force, cb) {
    var qs = {
        api_key: apikey
    };

    if (arguments.length > 2) {
        qs.force = force;
    } else {
        cb = force;
    }

    request.get({
        url: this.apiURL + "/protected/json/sms/" + id,
        qs: qs
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cb(null, toJSON(body));
            } else {
                cb(toJSON(body));
            }
        } else {
            throw new Error(err);
        }
    });
};

// Utility functions. Should live somebody else probably.
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
