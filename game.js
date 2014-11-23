var request = require('request');
var api_token = process.env.api_token;

var Game = function(username, location) {
  this.players = {};
  this.marko;
  this.addPlayer(username, location);
};

Game.prototype.addPlayer = function(username, location) {
  this.players[username] = {
    username : username,
    location : location
  };
};

Game.prototype.removePlayer = function(username) {
  delete this.players[username];
};

Game.prototype.setMarko = function() {
  var playerCount = Object.keys(this.players).length;
  var randomIndex = Math.floor(Math.random() * playerCount);
  this.marko = Object.keys(this.players)[randomIndex];
  this.removePlayer(this.getMarko());
  console.log('Set Marko to',this.getMarko());
};

Game.prototype.getMarko = function() {
  return this.marko;
};

Game.prototype.start = function(usersInGames) {
  console.log('Game beginning!');
  var context = this;
  // add key/value pairs username:thisGame
  Object.keys(this.players).forEach(function(username){
    usersInGames[username] = context;
  });
  console.log('added',Object.keys(this.players),'to usersInGames');
  this.setMarko();
};

Game.prototype.yoNonMarkos = function(){
  var nonMarkos = Object.keys(this.players);
  console.log(this.getMarko(),'pinging',nonMarkos);
  sendYos(nonMarkos);
};

Game.prototype.end = function(username, usersInGames) {
  console.log('Game ending! ',this.getMarko(),'caught',username);
  // remove key/value pairs username:thisGame
  Object.keys(this.players).forEach(function(username){
    delete usersInGames[username];
  });
};

// HELPER FUNCTIONS
function sendYos(usernames){
  usernames.forEach(function(username){
    sendYo(username);
  });
};

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
        // console.log(body);
      }
    }
  );
};

module.exports = Game;
