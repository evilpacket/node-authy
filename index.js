var request = require('request');

module.exports = function (api_key, api_url) {
    apiurl = api_url || 'https://api.authy.com';
    apikey = module.exports.apikey = api_key;

    return module.exports;
};

module.exports.register_user = function (email, cellphone, country_code, cb) {
    var url = apiurl + "/protected/json/users/new"; 
    var qs = {api_key: apikey};
  
    // Default to USA if no country_code is provided 
    var country = 'USA';  
    if (arguments.length > 3) {
       country = country_code; 
    } else {
        cb = country_code;
    }

    var form = {
        "user[email]": email,
        "user[cellphone]": cellphone,
        "user[country_code]": country 
    };

    request.post({
        url: url,
        form: form,
        qs: qs
    }, function (err, res, body) {
        if (!err) {
            if (res.statusCode === 200) {
                cb(null, toJSON(body));
            } else {
                cb(JSON.parse(toJSON(body)));
            }
        } else {
            throw new Error(err);
        }
    });
};

module.exports.verify = function (id, token, force, cb) {
    var url = apiurl + "/protected/json/verify/" + token + "/" + id;

    var qs = {api_key: apikey};
    if (arguments.length > 3) {
        qs.force = force; 
    } else {
        cb = force;
    }

    request.get({
        url: url,
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

module.exports.request_sms = function (id, force, cb) {
    var url = apiurl + "/protected/json/sms/" + id;

    var qs = {api_key: apikey};
    if (arguments.length > 2) {
        qs.force = force;
    } else {
        cb = force;
    }

    request.get({
        url: url,
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
