[![Dependency Status](https://david-dm.org/evilpacket/node-authy.png)](https://david-dm.org/evilpacket/node-authy)

# Node.js Client for Twilio Authy Two-Factor Authentication (2FA) API

[Authy](https://www.twilio.com/authy) client for Node.js written by Adam Baldwin.

Documentation for this Node.js usage of the Authy API lives in the [official Twilio documentation](https://www.twilio.com/docs/authy/api/).

The Authy API supports multiple channels of 2FA:
* One-time passwords via SMS and voice.
* Soft token ([TOTP](https://www.twilio.com/docs/glossary/totp) via the Authy App)
* Push authentication via the Authy App

If you only need SMS and Voice support for one-time passwords, we recommend using the [Twilio Verify API](https://www.twilio.com/docs/verify/api) instead. 

[More on how to choose between Authy and Verify here.](https://www.twilio.com/docs/verify/authy-vs-verify)

### Authy Quickstart

For a full tutorial, check out the Node.js Authy Quickstart in our docs:
* [Node.js Authy Quickstart](https://www.twilio.com/docs/authy/quickstart/two-factor-authentication-nodejs)

## Authy Node.js Installation

Install with [npm](https://www.npmjs.com/):

    $ npm install authy

## Usage

To use the Authy client, require `Authy` and initialize it with your production API Key found in the [Twilio Console](https://www.twilio.com/console/authy/applications/):

```js
var authy = require('authy')('APIKEY');
```

![authy api key in console](https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/account-security-api-key.width-800.png)

## 2FA Workflow

1. [Create a user](https://www.twilio.com/docs/authy/api/users#enabling-new-user)
2. [Send a one-time password](https://www.twilio.com/docs/authy/api/one-time-passwords)
3. [Verify a one-time password](https://www.twilio.com/docs/authy/api/one-time-passwords#verify-a-one-time-password)

**OR**

1. [Create a user](https://www.twilio.com/docs/authy/api/users#enabling-new-user)
2. [Send a push authentication](https://www.twilio.com/docs/authy/api/push-authentications)
3. [Check a push authentication status](https://www.twilio.com/docs/authy/api/push-authentications#check-approval-request-status)


## <a name="phone-verification"></a>Phone Verification

[Phone verification now lives in the Twilio API](https://www.twilio.com/docs/verify/api) and has [Node.js support through the official Twilio helper libraries](https://www.twilio.com/docs/libraries/node). 

[Legacy (V1) documentation here.](verify-legacy-v1.md) **Verify V1 is not recommended for new development. Please consider using [Verify V2](https://www.twilio.com/docs/verify/api)**.

## Contributing

Install dependencies:

    npm install

To run tests:

    npm test


### Contributors

- [Daniel Barnes](https://github.com/DanielBarnes)
- [Josh Staples](https://github.com/josh-authy)
- [Christian Muertz](https://github.com/christian-muertz)