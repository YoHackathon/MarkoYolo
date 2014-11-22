var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var calculators = require('./calculators');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var api_token = process.env.api_token;
var openGames = {};

app.post('/yos', function(req, res){
  // body should contain usernames array
  // sends a yo (with optional link or location) to each username
  // returns success, partial success, or total failure
  console.log(req.body);
  var usernames = req.body.usernames;
  sendYos(usernames);
  res.send(200,'OKAY');
});

app.get('/play', function(req, res){
  var yo = req.query;
  console.log(yo)
  // if @yo
  if( yo.location ){
    // if open game nearby exists then join that game
    if ( gameExists(yo.location) ){
      openGames[area].push(yo.username);
    // else create game
    } else {
      openGames.push(new Game(yo.username, yo.location));
    }
  } else {
    //
    // if game.active and yo from marko, yoeach non-player
    //
    // if game.active and yo from non-player, end game
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});

// HELPER FUNCTIONS
// send a yo:
function sendYo(username){
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

function sendYos(usernames){
  usernames.forEach(function(username){
    sendYo(username);
  });
};

function gameExists(userLocation){
  // get list of pending games
  var pendingGames = Object.keys(openGames);

  // if game is within 10 ft of another game, return true
  return pendingGames.some(function(pendingGame){
    var distance = calculators.distance(pendingGame, userLocation).toFeet();
    return distance < 10;
  });
}

/** Converts numeric km to ft */
if (typeof(Number.prototype.toFeet) === "undefined") {
  Number.prototype.toFeet = function() {
    return this * 3280.84;
  };
}