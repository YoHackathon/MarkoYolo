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
  delete players[username];
};

Game.prototype.setMarko = function() {
  var playerCount = this.players.length;
  var randomIndex = Math.floor(Math.random() * playerCount);

  this.marko = this.players[randomIndex];
  this.removePlayer(marko.id);
};

Game.prototype.getMarko = function() {
  return this.marko;
};

Game.prototype.init = function() {
  this.setMarko();
};

Game.prototype.yoNonMarkos = function(){
  sendYos(this.players.map(function(player){
    return player.username;
  }));
};

Game.prototype.end = function() {
  //code for ending game
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
        console.log(body);
      }
    }
  );
};

module.exports = Game;
