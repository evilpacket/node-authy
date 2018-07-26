var apikey = "0cd08abec2e9b9641e40e9470a7fc336";
var authy = require('../index')(apikey, 'http://sandbox-api.authy.com');

var test_user = {email: 'baldwin@andyet.net', phone: '825-589-8570', country: '57'};

/*
 * Nodeunit swallows uncaught exceptions--get them back!
 */
process.on('uncaughtException', function (err) {
    console.error(err.stack);
});

/*
 *  Register New User Tests
 */
exports['Register New User - Without country code or SMS install link param'] = function (test) {
    authy.register_user(test_user.email, test_user.phone, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.ok(res.user);
        test_user.id = res.user.id; // Save ID for future tests
        test.done();
    });
};

exports['Register New User - With country code but no SMS install link param'] = function (test) {
    authy.register_user(test_user.email, test_user.phone, test_user.country, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

exports['Register New User - With country code and SMS install link param'] = function (test) {
    authy.register_user(test_user.email, test_user.phone, test_user.country, false, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

exports['Register New User - With SMS install link param but no country code'] = function (test) {
    authy.register_user(test_user.email, test_user.phone, false, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

exports['Register New User - Blank Email'] = function (test) {
    authy.register_user(null, test_user.phone, test_user.country, function (err, res) {
        test.ok(err, 'Should get error.');
        test.equal(typeof(err), 'object', 'Error should be an object.');
        test.equal(err.success, false, 'Success should be false.')
        test.done();
    });
};

exports['Register New User - Blank Phone'] = function (test) {
    authy.register_user(test_user.email, null, test_user.country, function (err, res) {
        test.ok(err, 'Should get error.');
        test.equal(typeof(err), 'object', 'Error should be an object.');
        test.equal(err.success, false, 'Success should be false.')
        test.done();
    });
};

exports['Register New User - Invalid Country Code'] = function (test) {
    authy.register_user(test_user.email, null, -100, function (err, res) {
        test.ok(err, 'Should get error.');
        test.equal(typeof(err), 'object', 'Error should be an object.');
        test.equal(err.success, false, 'Success should be false.')
        test.done();
    });
};

/*
 *  Verify Token Tests
 */
exports['Verify Token'] = function (test) {
    authy.verify(test_user.id, '0000000', function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

exports['Verify Token - Force'] = function (test) {
    authy.verify(test_user.id, '0000000', true, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

exports['Verify Token - Invalid'] = function (test) {
    authy.verify(test_user.id, 'invalid', true, function (err, res) {
        test.ok(!res);
        test.equal(typeof(res), 'undefined', 'Response should be undefined.');
        test.done();
    });
};

exports['Verify Token - Dirty'] = function (test) {
    authy.verify(test_user.id, '0a0$0%0b0*@!#00', true, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.done();
    });
};

exports['Verify Token - Empty String'] = function (test) {
    authy.verify(test_user.id, '', true, function (err, res) {
        test.ok(!res);
        test.equal(typeof(res), 'undefined', 'Response should be undefined.');
        test.ok(err instanceof Error);
        test.equal(err.toString(), "Error: argument 'token' cannot be empty, null, or undefined");
        test.done();
    });
};

exports['Verify Token - Null'] = function (test) {
    authy.verify(test_user.id, null, true, function (err, res) {
        test.ok(!res);
        test.equal(typeof(res), 'undefined', 'Response should be undefined.');
        test.ok(err instanceof Error);
        test.equal(err.toString(), "Error: argument 'token' cannot be empty, null, or undefined");
        test.done();
    });
};

exports['Verify Token - Undefined'] = function (test) {
    authy.verify(test_user.id, undefined, true, function (err, res) {
        test.ok(!res);
        test.equal(typeof(res), 'undefined', 'Response should be undefined.');
        test.ok(err instanceof Error);
        test.equal(err.toString(), "Error: argument 'token' cannot be empty, null, or undefined");
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

exports['OneTouch Create Request'] = function (test) {
    var user_payload = {'message': 'Your message here'};
    authy.send_approval_request(test_user.id, user_payload, {}, null, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test_user.uuid = res.approval_request.uuid;
        test.done();
    });
};

exports['OneTouch Check Approval Status'] = function (test) {
    var user_payload = {'message': 'Your message here'};
    authy.send_approval_request(test_user.uuid, function (err, res) {
        test.ok(res);
        test.equal(typeof(res), 'object', 'Response should be an object.');
        test.equal(res.approval_request.status, 'pending', 'Request should be pending');
        test.done();
    });
};

/*
 *  Users tests
 */
exports.users = {
    status: {
        setUp: function(callback) {
            authy.register_user(test_user.email, test_user.phone, function(err, res) {
                test_user.id = res.user.id;
                callback();
            });
        },

        does_not_exists: function(test) {
            authy.user_status("tony", function (err, res) {
                test.ok(err, 'Should get error.');
                test.equal(typeof(err), 'object', 'Error should be an object.');
                test.equal(err.success, false, 'Success should be false.')
                test.equal(err.message, "User not found.");
                test.done();
            });
        },

        exists: function(test) {
            authy.user_status(test_user.id, function (err, res) {
                test.ok(res);
                test.equal(typeof(res), 'object', 'res should be an object.');
                test.equal(res.success, true, 'Success should be true.')
                test.equal(typeof(res.status), 'object');
                test.done();
            });
        }
    }
};

/*
 *  Phone Info tests
 */
exports.phones = {
    verification_starts: {
        without_via: function (test) {
            test.expect(1);
            authy.phones().verification_start("111-111-1111", "1",
                function (err, res) {
                    test.ok(res);
                    test.done();
                }
            );
        },

        with_via: function (test) {
            test.expect(1);
            authy.phones().verification_start("111-111-1111", "1", "sms",
                function (err, res) {
                    test.ok(res);
                    test.done();
                }
            );
        },

        with_params: function (test) {
            test.expect(1);
            var params = {
                via: "sms",
                locale: "pl",
                custom_message: "This is a custom message",
                code_length: "6",
                custom_code: "12345"
            }
            authy.phones().verification_start("111-111-1111", "1", params,
                function (err, res) {
                    test.ok(res);
                    test.done();
                }
            );
        },

        with_params_locale_only: function (test) {
            test.expect(1);
            var params = {
                locale: "pl"
            }
            authy.phones().verification_start("111-111-1111", "1", params,
                function (err, res) {
                    test.ok(res);
                    test.done();
                }
            );
        }
    },

    verification_check: function (test) {
        test.expect(1);
        authy.phones().verification_check("111-111-1111", "1", "0000",
            function (err, res) {
                test.ok(res);
                test.done();
            }
        );
    },

    verification_status: function (test) {
        test.expect(1);
        authy.phones().verification_status("111-111-1111", "1",
            function (err, res) {
                test.ok(res);
                test.done();
            }
        );
    },

    info: function (test) {
        test.expect(1);
        authy.phones().info("7754615609", "1",
            function (err, res) {
                test.ok(res);
                test.done();
            }
        );
    }
}
