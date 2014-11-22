var express = require('express');
var bodyParser = require('body-parser');
var Game = require('./game');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var openGames = {};
var activeGames = [];
var REGISTRATION_WINDOW = 30; //seconds

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
