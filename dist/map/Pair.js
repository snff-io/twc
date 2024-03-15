"use strict";
class Pair {
    x;
    y;
    topType;
    bottomType;
    magnitude;
    pressure;
    layer;
    constructor(x, y, topType, bottomType, magnitude = 1, pressure = 0, layer = 0) {
        this.x = x;
        this.y = y;
        this.topType = topType;
        this.bottomType = bottomType;
        this.magnitude = magnitude;
        this.pressure = pressure;
        this.layer = layer;
    }
    static stability_table = [
        [-1, 1, 2, 3, 4, 5, 6, 7, 8],
        [1, 1, 0, 0, 0, 0, 0, 0, 0],
        [2, 1, 1, 1, 0, 1, 1, 1, 1],
        [3, 1, 0, 1, 1, 1, 1, 0, 0],
        [4, 1, 0, 0, 1, 1, 1, 0, 0],
        [5, 1, 0, 0, 0, 1, 0, 0, 0],
        [6, 1, 0, 0, 0, 1, 1, 0, 0],
        [7, 1, 0, 0, 0, 1, 1, 1, 1],
        [8, 1, 0, 0, 1, 1, 1, 0, 1]
    ];
    static none = new Pair(-1, -1, -1, -1, -1, -1, -1);
    static get None() {
        return this.none;
    }
    static randomIndividual(x, y, layer = 0) {
        const topType = Math.floor(Math.random() * 8) + 1;
        const bottomType = Math.floor(Math.random() * 8) + 1;
        const magnitude = 1; // Default magnitude is 1
        const pressure = 0; // Default pressure is 0
        return new Pair(x, y, topType, bottomType, magnitude, pressure, layer);
    }
    static checkStability(topType, bottomType) {
        return Pair.stability_table[bottomType][topType];
    }
    get stability() {
        return Pair.stability_table[this.bottomType][this.topType];
    }
    equals(other) {
        return this.x === other.x &&
            this.y === other.y &&
            this.topType === other.topType &&
            this.bottomType === other.bottomType &&
            this.magnitude === other.magnitude &&
            this.pressure === other.pressure &&
            this.layer === other.layer;
    }
    copy() {
        return new Pair(this.x, this.y, this.topType, this.bottomType, this.magnitude, this.pressure, this.layer);
    }
    toString() {
        return `${this.stability}${this.topType}${this.bottomType};${this.magnitude.toFixed(2)};${this.pressure.toFixed(2)};${this.layer}:${this.x}:${this.y}`;
    }
}
//# sourceMappingURL=Pair.js.map