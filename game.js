const Grid = require("./grid");
const Player = require("./player");

class Game {
  constructor() {
    this.score = 0;
    this.grid = new Grid();
    this.players = {};
  }

  update() {
    Object.keys(this.players).forEach(playerId => {
      this.players[playerId].handleInput();
    });
  }
}

module.exports = Game;
