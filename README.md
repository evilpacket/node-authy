node-authy
==========

Authy API Client for node.js

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

register_user(email, cellphone, [country_code], callback);

```javascript
authy.register_user('baldwin@andyet.net', '509-555-1212', function (err, res) {
    // res = {user: {id: 1337}} where 1337 = ID given to use, store this someplace
});
```

Verify Token
------------

verify(id, token, [force], callback);

```javascript
authy.verify('1337', '0000000' function (err, res) {

});
```

Request SMS
-----------

request_sms(id, [force], callback);

```javascript
authy.request_sms('1337', function (err, res) {

});
```

