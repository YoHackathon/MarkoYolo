var express = require('express');
var bodyParser = require('body-parser');
var Game = require('./game');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var openGames = {};
var usersInGames = {};

var REGISTRATION_WINDOW = 30; //seconds

app.get('/play', function(req, res){
  var yo = req.query;
  console.log(yo)
  // if @yo
  if( yo.location ){
    // if open game nearby exists then join that game
    if ( gameExists(yo.location) ){
      openGames[area].addPlayer(yo.username);
    } else {
    // else create game
      var thisGame = new Game(yo.username, yo.location);
      openGames[area] = thisGame;
      setTimeout(function(){
        delete openGames[area];
        thisGame.init(usersInGames);
      }, REGISTRATION_WINDOW*1000);
    }
  } else {
    thisGame = usersInGames[yo.username];
    var marko = thisGame.getMarko();
    // if game.active and yo from marko, yoeach non-player
    if(yo.username === marko){
      thisGame.yoNonMarkos();
    } else {
    // else game.active and yo from non-player, end game
      thisGame.end(yo.username, usersInGames);
    }
  }
});

var port = process.env.PORT || 4568;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = port;
  console.log('Example app listening at http://%s:%s', host, port)
});

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
