var path = require('path');
var qs = require('querystring');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');
var CronJob = require('cron').CronJob;
var YantasySports = require('../yfsapi-without-auth/index.js');

var clientId = 'CLIENT_ID';
var clientSecret = 'CLIENT_SECRET';
var redirectUri = 'http://myapp.com/auth/yahoo/callback';

var yf = new YantasySports();

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 80);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));








app.get('/', function(req, res) {
  

  var accessToken = 'TOKEN';
  yf.setUserToken(accessToken);
  /*
  yf.transactions.adddrop_players(
      'mlb.l.154',       // leagueKey
      'mlb.l.154.t.7',   // teamKey
      'mlb.p.9098',        // addPlayerKey
      'mlb.p.9191',        // dropPlayerKey
        function(err, data) {
          if (err) {
            console.log(err);
            console.log('[err]' + JSON.stringify(data));
          }
          else
            req.session.result = data;
          console.log('[data]' + JSON.stringify(data));
        }
      );
      */

new CronJob('59 59 15 * * *', function() {
     yf.transactions.adddrop_players(
      'mlb.l.154',       // leagueKey
      'mlb.l.154.t.7',   // teamKey
      'mlb.p.9098',        // addPlayerKey
      'mlb.p.9191',        // dropPlayerKey
        function(err, data) {
          if (err) {
            console.log(err);
            console.log('[err]' + JSON.stringify(data));
          }
          else
            req.session.result = data;
          console.log('[data]' + JSON.stringify(data));
        }
      );
}, null, true, 'Asia/Seoul');

  var data;
  if (req.session.result)
    data = JSON.stringify(req.session.result, null, 2);
  
  res.render('home', {
    title: 'Home',
    user: req.session.token,
    data: data
  });
});

app.get('/logout', function(req, res) {
  delete req.session.token;
  res.redirect('/');
});

app.get('/auth/yahoo', function(req, res) {
  var authorizationUrl = 'https://api.login.yahoo.com/oauth2/request_auth';
  var queryParams = qs.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code'
  });

  res.redirect(authorizationUrl + '?' + queryParams);
});

app.get('/auth/yahoo/callback', function(req, res) {
  var accessTokenUrl = 'https://api.login.yahoo.com/oauth2/get_token';
  var options = {
    url: accessTokenUrl,
    headers: { Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64') },
    rejectUnauthorized: false,
    json: true,
    form: {
      code: req.query.code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }
  };

  request.post(options, function(err, response, body) {
    if (err)
      console.log(err);
    else {
      var accessToken = body.access_token;
      // TODO : Handle this refreshToken!
      //var refreshToken = body.refresh_token;

      req.session.token = accessToken;

      yf.setUserToken(accessToken);
      
      yf.user.games(
        function(err, data) {
          if (err)
            console.log(err);
          else
            req.session.result = data;
          
           return res.redirect('/');
        }
      );      
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
