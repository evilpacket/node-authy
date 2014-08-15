# node-authy [![Dependency Status](https://david-dm.org/evilpacket/node-authy.png)](https://david-dm.org/evilpacket/node-authy)

[Authy](https://authy.com/) API Client for node.js

Usage
=====

Installation
------------

```
npm install authy
```

When in doubt check out the official [Authy API docs](http://docs.authy.com/)


Require all the things
----------------------

```javascript
var authy = require('authy')('APIKEY');
```

If you want to use the sandbox for testing require this way.

```javascript
var authy = require('authy')('SANDBOX_APIKEY', 'http://sandbox-api.authy.com');
```


Register New User
-----------------

register_user(email, cellphone, [country_code], [send_install_link_via_sms], callback);


```javascript
authy.register_user('baldwin@andyet.net', '509-555-1212', function (err, res) {
    // res = {user: {id: 1337}} where 1337 = ID given to use, store this someplace
});
```

If not given, `country_code` defaults to `"1"` and `send_install_link_via_sms` defaults to `true`.

Verify Token
------------

verify(id, token, [force], callback);

```javascript
authy.verify('1337', '0000000', function (err, res) {

});
```

Request SMS
-----------

request_sms(id, [force], callback);

```javascript
authy.request_sms('1337', function (err, res) {

});
```

Request Call (Email support@authy.com to enable this feature)
-------------------------------------------------------------

request_call(id, [force], callback);

```javascript
authy.request_call('1337', function (err, res) {

});
```

Delete Registered User
----------------------

delete_user(id, callback);

```javascript
authy.delete_user('1337', function (err, res) {

});
```

Get Registered User Status
--------------------------

user_status(id, callback);

```javascript
authy.user_status('1337', function (err, res) {

});
```

Start Phone Verification
------------------------

phones().verification_start(phone_number, country_code, via, callback);

```javascript
authy.phones().verification_start('111-111-1111', '1', 'sms', function(err, res) {

});
```

Check Phone Verification
------------------------

phones().verification_check(phone_number, country_code, verification_code, callback);

```javascript
authy.phones().verification_check('111-111-1111', '1', '0000', function (err, res) {

});
```

Get Phone Info
------------------------

phones().info(phone_number, country_code, callback);

```javascript
authy.phones().info('111-111-1111-, '1', function (err, res) {

});
```

Additional Contributors
-----------------------
[Daniel Barnes](https://github.com/DanielBarnes)

