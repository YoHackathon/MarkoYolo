var Game = function(playerId, playerLatLong) {
  this.playerList = {};
  this.marko;
  this.addPlayer(playerId, playerLatLong);
};

Game.prototype.addPlayer = function(playerId, playerLatLong) {
  this.playerList[playerId] = {
    id : playerId,
    latLong : playerLatLong
  };
};

Game.prototype.removePlayer = function(playerId) {
  delete playerList[playerId];
};

Game.prototype.setMarko = function() {
  var playerCount = this.playerList.length;
  var randomIndex = Math.floor(Math.random() * playerCount);

  this.marko = this.playerList[randomIndex];
  this.removePlayer(marko.id);
};

Game.prototype.getMarko = function() {
  return this.marko;
};

Game.prototype.init = function() {
  this.setMarko();
};

Game.prototype.end = function() {
  //code for ending game
};

module.exports = Game();
