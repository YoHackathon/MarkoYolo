var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var api_token = process.env.api_token;
var openGames = [];

// send a yo:
var sendYo = function(username){
  request.post(
    'http://api.justyo.co/yo/',
    { form:
      {
        'api_token': api_token,
        'username': username
        // optional link XOR location string parameter
      },
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    }
  );
};

var sendYos = function(usernames){
  usernames.forEach(function(username){
    sendYo(username);
  });
};

app.post('/yos', function(req, res){
  // body should contain usernames array
  // sends a yo (with optional link or location) to each username
  // returns success, partial success, or total failure
  console.log(req.body);
  var usernames = req.body.usernames;
  sendYos(usernames);
  res.send(200,'OKAY');
});

app.post('/play', function(req, res){
  var yo = req.body;
  // if @yo
  if( yo.hasOwnProperty('location') ){
    var area = yo.location.split(',').reduce(function(coordinate, index){
      return String(Math.round(Number(coordinate), 4)+index ? ',' : '');
    },'');
    // if open game nearby exists then join that game
    if( openGames.indexOf(area) >= 0 ){
      openGames[area].push(yo.username);
    // else create game
    } else {
      openGames.push(new Game(yo.username, yo.location));
    }
  // if normal yo
  } else {
    //
    // if game.active and yo from marko, yoeach non-player
    //
    // if game.active and yo from non-player, end game
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});
