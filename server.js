var express = require('express');
var bodyParser = require('body-parser');
var Game = require('./game');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var openGames = {};
var usersInGames = {};

var REGISTRATION_WINDOW = 30; //seconds
var REGISTRATION_RADIUS = 10; //feet

app.get('/play', function(req, res){
  var yo = req.query;
  console.log(yo)
  // if @yo
  if( yo.location ){
    var matched = gameMatch(yo.location);
    // if open game nearby exists then join that game
    if ( matched ){
      openGames[matched].addPlayer(yo.username);
    } else {
    // else create game
      var newGame = new Game(yo.username, yo.location);
      openGames[yo.location] = newGame;
      setTimeout(function(){
        delete openGames[yo.location];
        newGame.init(usersInGames);
      }, REGISTRATION_WINDOW*1000);
    }
  } else {
    usersGame = usersInGames[yo.username];
    var marko = usersGame.getMarko();
    // if game.active and yo from marko, yoeach non-player
    if(yo.username === marko){
      usersGame.yoNonMarkos();
    } else {
    // else game.active and yo from non-player, end game
      usersGame.end(yo.username, usersInGames);
    }
  }
});

var port = process.env.PORT || 4568;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = port;
  console.log('Example app listening at http://%s:%s', host, port)
});

function gameMatch(userLocation){
  // get list of pending games
  var openGameIDs = Object.keys(openGames);

  // if game is within ## ft of another game, return true
  for (var i = 0; i < openGameIDs.length; i++ ){
    var openGameId = openGameIDs[i];
    var distance = calculators.distance(openGameId, userLocation).toFeet();
    if (distance < REGISTRATION_RADIUS) return openGameId;
  }
  return null;
}

/** Converts numeric km to ft */
if (typeof(Number.prototype.toFeet) === "undefined") {
  Number.prototype.toFeet = function() {
    return this * 3280.84;
  };
}
