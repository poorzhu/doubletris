const Piece = require("./piece");

// hold/swap piece?
// display queued pieces?

class Player {
  constructor() {
    this.pressingLeft = false;
    this.pressingRight = false;
    this.pressingDown = false;
    this.pressingUp = false;
    this.currentPiece = new Piece();
    // this.upcomingPieces = [];
    // this.heldPiece = [];
  }

  handleInput() {
    if (this.pressingLeft) this.currentPiece.move("LEFT");
    if (this.pressingRight) this.currentPiece.move('RIGHT');
    if (this.pressingDown) this.currentPiece.move('DOWN');
    if (this.pressingUp) this.currentPiece.rotate('CW', true);
    // if (this.pressingCCW) this.currentPiece.rotate('CCW', true);
  }
}

module.exports = Player;
