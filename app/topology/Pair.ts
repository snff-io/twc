
class Pair {
    constructor(
        public x: number,
        public y: number,
        public topType: number,
        public bottomType: number,
        public magnitude: number = 1,
        public pressure: number = 0,
        public layer: number = 0
    ) { }

    public static stability_table: number[][] = [
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
    public static get None(): Pair {
        return this.none;
    }

    static randomIndividual(x: number, y: number, layer: number = 0): Pair {
        const topType: number = Math.floor(Math.random() * 8) + 1;
        const bottomType: number = Math.floor(Math.random() * 8) + 1;
        const magnitude: number = 1; // Default magnitude is 1
        const pressure: number = 0; // Default pressure is 0



        return new Pair(x, y, topType, bottomType, magnitude, pressure, layer);
    }

    static checkStability(topType: number, bottomType: number): number {
        return Pair.stability_table[bottomType][topType];
    }

    get stability(): number {
        return Pair.stability_table[this.bottomType][this.topType];
    }

    equals(other: Pair): boolean {
        return this.x === other.x &&
            this.y === other.y &&
            this.topType === other.topType &&
            this.bottomType === other.bottomType &&
            this.magnitude === other.magnitude &&
            this.pressure === other.pressure &&
            this.layer === other.layer;
    }

    copy(): Pair {
        return new Pair(this.x, this.y, this.topType, this.bottomType, this.magnitude, this.pressure, this.layer);
    }

    toString(): string {
        return `${this.stability}${this.topType}${this.bottomType};${this.magnitude.toFixed(2)};${this.pressure.toFixed(2)};${this.layer}:${this.x}:${this.y}`;
    }
}
