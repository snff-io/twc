"use strict";
class PairGroup {
    current;
    north;
    south;
    east;
    west;
    up;
    down;
    constructor(current, grid) {
        this.current = current;
        var x = current.x;
        var y = current.y;
        var layer = current.layer;
        this.north = y + 1 < grid.layerSize ? grid.layers[layer][x][y + 1] : Pair.None;
        this.south = y - 1 >= 0 ? grid.layers[layer][x][y - 1] : Pair.None;
        this.east = x + 1 < grid.layerSize ? grid.layers[layer][x + 1][y] : Pair.None;
        this.west = x - 1 >= 0 ? grid.layers[layer][x - 1][y] : Pair.None;
        this.up = current.layer + 1 < grid.layerSize ? grid.layers[layer + 1][x][y] : Pair.None;
        this.down = current.layer > 0 ? grid.layers[layer - 1][x][y] : Pair.None;
    }
}
//# sourceMappingURL=PairGroup.js.map