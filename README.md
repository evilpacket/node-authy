# node-authy [![Dependency Status](https://david-dm.org/evilpacket/node-authy.png)](https://david-dm.org/evilpacket/node-authy)

[Authy](https://authy.com/) API Client for Node.js written by Adam Baldwin.

## Installation

```
npm install authy
```

When in doubt check out the official [Authy API docs](http://docs.authy.com/).

## Usage

#### Requiring node-authy

```javascript
var authy = require('authy')('APIKEY');
```

If you want to use the sandbox for testing require this way.

```javascript
var authy = require('authy')('SANDBOX_APIKEY', 'http://sandbox-api.authy.com');
```

#### Send OneTouch
[OneTouch API docs](http://docs.authy.com/onetouch.html#onetouch-api) are the source of truth.
send_approval_request(id,user_payload,hidden_details,logos,callback)
```javascript
authy.send_approval_request('1337', user_payload, [hidden_details], [logos], function (err, res) {
    // res = {"approval_request":{"uuid":"########-####-####-####-############"},"success":true}
});
```

* id is the Authy id.
* user_payload:  { 'message': 'user message here', ['details': {...}] }
* hidden_details: optional
* logos: optional 

#### Check Approval Status

check_approval_status (uuid,callback)
```javascript
authy.check_approval_status(uuid, function(err, res) {
    res = {
      "approval_request": {
        "_app_name": YOUR_APP_NAME,
        "_app_serial_id": APP_SERIAL_ID,
        "_authy_id": AUTHY_ID,
        "_id": INTERNAL_ID,
        "_user_email": EMAIL_ID,
        "app_id": APP_ID,
        "created_at": TIME_STAMP,
        "notified": false,
        "processed_at": null,
        "seconds_to_expire": 600,
        "status": 'pending',
        "updated_at": TIME_STAMP,
        "user_id": USER_ID,
        "uuid": UUID
      },
      "success": true
    }
});
```
#### Register New User

register_user(email, cellphone, [country_code], [send_install_link_via_sms], callback);


```javascript
authy.register_user('baldwin@andyet.net', '509-555-1212', function (err, res) {
    // res = {user: {id: 1337}} where 1337 = ID given to use, store this someplace
});
```

If not given, `country_code` defaults to `"1"` and `send_install_link_via_sms` defaults to `true`.

#### Verify Token

verify(id, token, [force], callback);

```javascript
authy.verify('1337', '0000000', function (err, res) {

});
```

#### Request SMS

request_sms(id, [force], callback);

```javascript
authy.request_sms('1337', function (err, res) {

});
```

#### Request Call (Email support@authy.com to enable this feature)

request_call(id, [force], callback);

```javascript
authy.request_call('1337', function (err, res) {

});
```

#### Delete Registered User

delete_user(id, callback);

```javascript
authy.delete_user('1337', function (err, res) {

});
```

#### Get Registered User Status

user_status(id, callback);

```javascript
authy.user_status('1337', function (err, res) {

});
```

#### Start Phone Verification

phones().verification_start(phone_number, country_code, params, callback);

```javascript
authy.phones().verification_start('111-111-1111', '1', { via: 'sms', locale: 'pl', custom_message: 'My message' }, function(err, res) {

});
```

The `params` argument is optional and sets 'sms' as the default `via`, leaving the other two options blank.


#### Check Phone Verification

phones().verification_check(phone_number, country_code, verification_code, callback);

```javascript
authy.phones().verification_check('111-111-1111', '1', '0000', function (err, res) {

});
```

#### Get Phone Info

phones().info(phone_number, country_code, callback);

```javascript
authy.phones().info('111-111-1111-', '1', function (err, res) {

});
```

***

##### Contributors

- [Daniel Barnes](https://github.com/DanielBarnes)
