var apikey = "0cd08abec2e9b9641e40e9470a7fc336";
var authy = require('../index')(apikey,'http://sandbox-api.authy.com');

var test_user = {email: 'baldwin@andyet.net', phone: '825-589-8570', country: '5'};

/*
 *  Register New User Tests
 */
exports['Register New User - Without country code'] = function (test) {
    authy.register_user(test_user.email, test_user.phone, function (err, res) {
        test.ok(res);
        test.ok(res.user);
        test_user.id = res.user.id; // Save ID for future tests
        test.done();
    });
};

exports['Register New User - With country code'] = function (test) {
    authy.register_user(test_user.email, test_user.phone, test_user.country, function (err, res) {
        test.ok(res);
        test.done();
    });
};

exports['Register New User - Blank Email'] = function (test) {
    test.done();
};

/*
 *  Verify Token Tests
 */
exports['Verify Token'] = function (test) {
    authy.verify(test_user.id, '0000000', function (err, res) {
        test.ok(res);
        test.done();
    });
};

exports['Verify Token - Force'] = function (test) {
    authy.verify(test_user.id, '0000000', true, function (err, res) {
        test.ok(res);
        test.done();
    });
};

/*
 *  Request SMS Tests
 */
exports['Request SMS'] = function (test) {
    authy.request_sms(test_user.id, function (err, res) {
        test.ok(res);
        test.done();
    });
};


exports['Request SMS - Force'] = function (test) {
    authy.request_sms(test_user.id, true, function (err, res) {
        test.ok(res);
        test.done();
    });
};

/*
 *  Request Call Tests
 */
exports['Request Call'] = function (test) {
    authy.request_call(test_user.id, function (err, res) {
        test.ok(res);
        test.done();
    });
};


exports['Request Call - Force'] = function (test) {
    authy.request_call(test_user.id, true, function (err, res) {
        test.ok(res);
        test.done();
    });
};
