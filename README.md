## NodeJS sample app for [Yahoo OAuth 2.0](https://developer.yahoo.com/oauth2/guide) + [yfsapi-without-auth](https://github.com/githubsmilo/yfsapi-without-auth)

I've created a customized version of [sahat/yahoo-oauth2-tutorial](https://github.com/sahat/yahoo-oauth2-tutorial/), and tested [user.games API](http://yfantasysandbox.herokuapp.com/resource/user/games) only. This application is tested on Ubuntu 15.10.

### Prerequisites

Go to [https://developer.apps.yahoo.com](https://developer.apps.yahoo.com) and create new Yahoo app.
* Application Name : anyone you want
* Application Type : Web Application
* Callback Domain : `myapp.com`
* API Permissions : Fantasy Sports [Read/Write]

Record your application's Client ID(Consumer Key) and Client Secret(Consumer Secret) given by Yahoo.

### Setup

##### 1. Install node.js dependencies
```bash
$ npm install
```

##### 2. Edit /ets/hosts
```bash
$ sudo vi /ets/hosts
Add `127.0.0.1 myapp.com`.
```

##### 3. Edit server.js and insert your Client ID and Client Secret.
```javascript
var clientId = 'YOUR_CLIENT_ID_HERE';
var clientSecret = 'YOUR_CLIENT_SECRET_HERE';
```

### Test

##### 1. Run the application
```bash
$ sudo node server.js
```

##### 2. Open `http://myapp.com` in your browser

##### 3. Log-in Yahoo by clicking right-top `Sign in with Yahoo` button.

### License

This module is available under the [MIT License](http://opensource.org/licenses/MIT).

