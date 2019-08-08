const Tile = require('./tile');

class Piece {
  constructor() {
    this.tiles = [
      new Tile([[5], [1]]), 
      new Tile([[6], [1]]),
      new Tile([[5], [2]]),
      new Tile([[4], [1]]),
    ];
    this.centerTile = this.tiles[0]; // create pieces so first tile is center?
    this.rotationIndex = 0;
  }

  move(direction) {
    let change;

    if (direction === 'LEFT') {
      change = [[-1],[0]];
    } else if (direction === 'RIGHT') {
      change = [[1], [0]];
    } else if (direction === 'DOWN') {
      change = [[0], [1]];
    }

    this.tiles.forEach(tile => {
      tile.addPos(tile.pos, change);
    });
  }

  rotate(rotationDirection, shouldOffset) {
    const newRotationIndex = (this.rotationIndex + 1) % 4;

    this.tiles.forEach(tile => {
      tile.rotate(this.centerTile, rotationDirection);
    })

    // this.offset(newRotationIndex);
    // offset tests? if all 5 fail -> shouldOffset = false
  }

  offset(newRotationIndex) {
    // find appropriate offset
    // apply appropriate offset to all pieces
    // if 5 tests fail, this.rotate(OPPOSITE rotation, FALSE), opposite via rotationIndexes
  }

}

module.exports = Piece;
