var express = require('express');
var bodyParser = require('body-parser');
var calculators = require('./calculators');
var Game = require('./game');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var openGames = {};
var usersInGames = {};

var REGISTRATION_WINDOW = 10; //seconds
var REGISTRATION_RADIUS = 1000; //feet

app.use(express.static(__dirname)); // serve static client
app.get('/', function(req,res){ // get to static client
  res.redirect('/client/');
});

app.get('/play', function(req, res){
  var yo = req.query;
  // if @yo
  if( yo.location ){
    console.log(' @yo received', yo);
    var matched = gameMatch(yo.location);
    // if open game nearby exists then join that game
    if ( matched ){
      console.log('Adding',yo.username,'to game.');
      openGames[matched].addPlayer(yo.username);
    } else {
    // else create game
      console.log('Creating new game started by',yo.username);
      var newGame = new Game(yo.username, yo.location);
      openGames[yo.location] = newGame;
      setTimeout(function(){
        delete openGames[yo.location];
        newGame.start(usersInGames);
      }, REGISTRATION_WINDOW*1000);
    }
  } else {
    console.log(' yo received', yo);
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
  res.status(200).send('OKAY');
});

var port = process.env.PORT || 4568;

var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('Example app listening at http://%s:%s', host, port)
});

function gameMatch(userLocation){
  // get list of pending games
  var openGameIDs = Object.keys(openGames);

  // if game is within ## ft of another game, return true
  for (var i = 0; i < openGameIDs.length; i++ ){
    var openGameId = openGameIDs[i];
    console.log('jon`s logs',openGameId, 'and more stuff:',userLocation);
    var distance = calculators.distance(openGameId, userLocation)*3280.8;
    console.log(' distance from game creator:',distance);
    if (distance < REGISTRATION_RADIUS) return openGameId;
  }
  return null;
}
