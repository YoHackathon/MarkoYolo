var express = require('express');
var bodyParser = require('body-parser');
var Game = require('./game');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var openGames = {};
var activeGames = [];
var REGISTRATION_WINDOW = 30; //seconds

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
    var area = yo.location.split(';').reduce(function(coordinate, index){
      return String(Math.round(Number(coordinate), 4)+index ? ';' : '');
    },'');
    console.log('Rounded',yo.username,'area to',area);
    // if open game nearby exists then join that game
    if( openGames.indexOf(area) >= 0 ){
      openGames[area].addPlayer(yo.username, yo.location);
    // else create game
    } else {
      var thisGame = new Game(yo.username, yo.location);
      openGames[area] = thisGame;
      setTimeout(function(){
        activeGames.push(thisGame);
        delete openGames[area];
      }, REGISTRATION_WINDOW*1000);
    }
  // if normal yo
  } else {
    thisGame = activeGames.findGame(yo.username);
    var marko = thisGame.getMarko();
    // if game.active and yo from marko, yoeach non-player
    if(yo.username === marko){
      thisGame.yoNonMarkos();
    // if game.active and yo from non-player, end game
    } else {
      thisGame.end();
    }
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
