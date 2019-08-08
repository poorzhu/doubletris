class Tile {
  constructor(pos) {
    this.pos = pos;
  }

  static calcNewPos(rotation, pos) {
    const result = new Array(rotation.length)
      .fill(0)
      .map(row => new Array(pos[0].length).fill(0));

    return result.map((row, i) => {
      return row.map((val, j) => {
        return rotation[i].reduce((sum, elm, k) => sum + elm * pos[k][j], 0);
      });
    });
  }

  rotate(centerTile, rotationDirection) {
    // todo where to put global constants
    const cwRotatoin = [[0, 1], [-1, 0]];
    const ccwRotation = [[0, -1], [1, 0]];

    let relativePos = [
      [this.pos[0][0] - centerTile.pos[0][0]],
      [this.pos[1][0] - centerTile.pos[1][0]]
    ];

    if (rotationDirection === "CW") {
      relativePos = Tile.calcNewPos(cwRotatoin, relativePos);
    } else {
      relativePos = Tile.calcNewPos(ccwRotation, relativePos);
    }

    this.addPos(relativePos, centerTile.pos);
  }

  addPos(a, b) {
    this.pos = [
      [a[0][0] + b[0][0]],
      [a[1][0] + b[1][0]]
    ];
  }
}

module.exports = Tile;
