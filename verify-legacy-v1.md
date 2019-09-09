# Phone Verification V1

[Version 2 of the Verify API is now available!](https://www.twilio.com/docs/verify/api) V2 has an improved developer experience and new features. Some of the features of the V2 API include:

* Twilio helper libraries in JavaScript, Java, C#, Python, Ruby, and PHP
* PSD2 Secure Customer Authentication Support
* Improved Visibility and Insights

You are currently viewing Version 1. V1 of the API will be maintained for the time being, but any new features and development will be on Version 2. We strongly encourage you to do any new development with API V2. Check out the migration guide or the API Reference for more information.

### API Reference

API Reference is available at https://www.twilio.com/docs/verify/api/v1

#### Start Phone Verification
Browse the [API docs](https://www.twilio.com/docs/verify/api/verification) for all available params.

phones().verification_start(phone_number, country_code, params, callback);

```javascript
authy.phones().verification_start('111-111-1111', '1', { via: 'sms', locale: 'en', code_length: '6' }, function(err, res) {

});
```

The `params` argument is optional and sets 'sms' as the default `via`, leaving the other two options blank.


#### Check Phone Verification
Browse the [API docs](https://www.twilio.com/docs/verify/api/verification) for all available params.

phones().verification_check(phone_number, country_code, verification_code, callback);

```javascript
authy.phones().verification_check('111-111-1111', '1', '0000', function (err, res) {

});
```

#### Status of Phone Verification
Browse the [API docs](https://www.twilio.com/docs/verify/api/verification) for all available params.

phones().verification_status(phone_number, country_code, callback);

```javascript
authy.phones().verification_status('111-111-1111', '1', function (err, res) {

});
```