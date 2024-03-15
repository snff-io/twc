let gridSize: number = 18; // Size of each layer in the grid
let numLayers: number = 18; // Total number of layers
let maxMagnitude: number = 50;
let font: any;
let grid: Pair[][][] | null[][];
let WEB_GL: boolean = true;
const vp: number = 1024;

const stability_table: number[][] = [
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

function checkStability(topType: number, bottomType: number): number {
    return stability_table[bottomType][topType];
}

class Pair {
    constructor(
        public x: number,
        public y: number,
        public topType: number,
        public bottomType: number,
        public magnitude: number = 1,
        public pressure: number = 0,
        public layer: number = 0
    ) {}

    get stability(): number {
        return stability_table[this.bottomType][this.topType];
    }

    copy(): Pair {
        return new Pair(this.x, this.y, this.topType, this.bottomType, this.magnitude, this.pressure, this.layer);
    }

    toString(): string {
        return `${this.stability}${this.topType}${this.bottomType};${this.magnitude.toFixed(2)};${this.pressure.toFixed(2)};${this.layer}:${this.x}:${this.y}`;
    }
}

function randomIndividual(x: number, y: number, layer: number = 0): Pair {
    const topType: number = Math.floor(Math.random() * 8) + 1;
    const bottomType: number = Math.floor(Math.random() * 8) + 1;
    const magnitude: number = 1; // Default magnitude is 1
    const pressure: number = 0; // Default pressure is 0

    return new Pair(x, y, topType, bottomType, magnitude, pressure, layer);
}

function initializeGrid(size: number, layerSize: number, popLayers: number = 0): void {
    grid = [];

    // Layer 0 - Populated with random individuals
    for (let layerIndex = 0; layerIndex < layerSize; layerIndex++) {
        if (grid.length >= size) {
            break;
        }

        if (grid.length <= popLayers) {
            let layer: Pair[][] = [];
            for (let x = 0; x < size; x++) {
                let col: Pair[] = [];
                layer.push(col);

                for (let y = 0; y < size; y++) {
                    col.push(randomIndividual(x, y, grid.length));
                }
            }
            grid.push(layer);
        } else {
            // Fill with a layer of the same size, all values null
            let emptyLayer: null[][] = Array.from({ length: size }, () => Array(size).fill(null));
            grid.push(emptyLayer);
        }
    }
}

function simulateSingleTurn(): void {
    for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                let pair = grid[layerIndex][x][y];
                if (pair !== null) {
                    let pairGroup = getPairGroup(pair, x, y);
                    updateMagnitude(pairGroup);
                    let flip = updateStability(pairGroup);
                    flipPair(flip, pairGroup);
                }
            }
        }
    }
}

function getPairGroup(pair: Pair, x: number, y: number): { [key: string]: Pair | null } {
    let pairGroup: { [key: string]: Pair | null } = {};
    pairGroup["current"] = pair;
    pairGroup["north"] = y + 1 < gridSize ? grid[pair.layer][x][y + 1] : null;
    pairGroup["south"] = y - 1 >= 0 ? grid[pair.layer][x][y - 1] : null;
    pairGroup["east"] = x + 1 < gridSize ? grid[pair.layer][x + 1][y] : null;
    pairGroup["west"] = x - 1 >= 0 ? grid[pair.layer][x - 1][y] : null;
    pairGroup["up"] = pair.layer + 1 < numLayers ? grid[pair.layer + 1][x][y] : null;
    pairGroup["down"] = pair.layer > 0 ? grid[pair.layer - 1][x][y] : null;
    return pairGroup;
}

function updateMagnitude(pairGroup: { [key: string]: Pair | null }): void {
    pairGroup["current"].magnitude += 0.1;
}

function updateStability(pairGroup: { [key: string]: Pair | null }): boolean {
    let stability: number = 0;
    let pressure: number = 0;

    if (pairGroup["current"].stability === 1) {
        stability += pairGroup["current"].magnitude;
    } else {
        pressure += pairGroup["current"].magnitude;
    }

    for (let direction of ["north", "south", "east", "west"]) {
        let neighbor = pairGroup[direction];
        if (neighbor === null) {
            pressure += 0.9;
        } else if (checkStability(neighbor.topType, pairGroup["current"].topType) === 1) {
            stability += neighbor.magnitude;
        } else {
            pressure += neighbor.magnitude;
        }
    }

    if (pairGroup["up"] !== null) {
        if (checkStability(pairGroup["up"].bottomType, pairGroup["current"].topType) === 1) {
            stability += pairGroup["up"].magnitude;
        } else {
            pressure += pairGroup["up"].magnitude;
        }
    }

    if (pairGroup["down"] !== null) {
        if (checkStability(pairGroup["down"].topType, pairGroup["current"].bottomType) === 1) {
            stability += pairGroup["down"].magnitude;
        } else {
            pressure += pairGroup["down"].magnitude;
        }
    }

    return stability < pressure;
}

function flipPair(flip: boolean, pairGroup: { [key: string]: Pair | null }): void {
    if (flip) {
        if (pairGroup["current"].stability === 1) {
            if (pairGroup["current"].magnitude > maxMagnitude) {
                if (pairGroup["current"].layer + 1 < numLayers && pairGroup["up"] === null) {
                    pairGroup["up"] = pairGroup["current"].copy();
                    pairGroup["up"].layer = pairGroup["current"].layer + 1;
                    pairGroup["up"].topType = pairGroup["current"].bottomType;
                    pairGroup["up"].bottomType = pairGroup["current"].topType;
                    grid[pairGroup["up"].layer][pairGroup["up"].x][pairGroup["up"].y] = pairGroup["up"];
                }
                pairGroup["up"].magnitude = pairGroup["current"].magnitude / 2;
                pairGroup["current"].magnitude = pairGroup["current"].magnitude / 2;
            }
        } else {
            let directions = ["up", "down", "north", "south", "east", "west"];
            let neighbors = directions.reduce((count, direction) => count + (pairGroup[direction] !== null ? 1 : 0), 0);
            for (let direction of directions) {
                let neighbor = pairGroup[direction];
                if (neighbor !== null) {
                    neighbor.magnitude += 0.1 / neighbors;
                }
            }
            let temp = pairGroup["current"].topType;
            pairGroup["current"].topType = pairGroup["current"].bottomType;
            pairGroup["current"].bottomType = temp;
            pairGroup["current"].magnitude -= 1;
            if (pairGroup["current"].magnitude < 1 && pairGroup["current"].layer === 0) {
                pairGroup["current"].magnitude = 1;
            }
            if (pairGroup["current"].magnitude < 0) {
                grid[pairGroup["current"].layer][pairGroup["current"].x][pairGroup["current"].y] = null;
            }
        }
    } else {
        if (pairGroup["current"].stability === 1) {
            pairGroup["current"].magnitude += 0.1;
        } else {
            let directions = ["up", "down", "north", "south", "east", "west"];
            let neighbors = directions.reduce((count, direction) => count + (pairGroup[direction] !== null ? 1 : 0), 0);
            for (let direction of directions) {
                let neighbor = pairGroup[direction];
                if (neighbor !== null) {
                    neighbor.magnitude += 0.1 / neighbors;
                }
            }
        }
    }
}

function preload(): void {
    //loadFont("CourierPrime-Regular.ttf");
}

function setup(): void {
    let cam_step: number = 200;
    if (WEB_GL) {
        document.addEventListener('keydown', function (event: KeyboardEvent) {
            // Check which key is pressed by accessing event.key
            console.log('Key pressed:', event.key);
            switch (event.key) {
                case "e":
                    cam.z += cam_step;
                    break;
                case "d":
                    cam.z -= cam_step;
                    break;
                case "f":
                    cam.x += cam_step;
                    break;
                case "s":
                    cam.x -= cam_step;
                    break;
                case "q":
                    cam.y -= cam_step;
                    break;
                case "a":
                    cam.y += cam_step;
                    break;
                case "w":
                    cam.xr--;
                    break;
                case "r":
                    cam.xr++;
                    break;
                case 't':
                    cam.yr--;
                    break;
                case "g":
                    cam.yr++;
                    break;
            }
        });

        createCanvas(vp, vp, WEBGL);

        frameRate(100);
    }
    else {
        createCanvas(1024, 1024);
        frameRate(1000);
    }
    initializeGrid(gridSize, numLayers);
    //textFont(font);
}

function draw(): void {
    camera(cam.x, cam.y, cam.z, cam.cx, cam.cy, cam.cz);
    background(255);
    if (WEB_GL) {
        angleMode(DEGREES)
        rotateX(cam.xr);
        rotateY(cam.yr);

    }
    displayGrid();
    simulateSingleTurn();
}

function displayGrid(): void {
    // Draw grid
    let cellSize: number = width / gridSize;
    let spacing: number = 0.1 * cellSize; // Define spacing between boxes
    let shrunkSize: number = 0.8 * cellSize; // Define the size of the shrunk boxes

    for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                let pair = grid[layerIndex][x][y];
                if (pair !== null) {
                    let xPos: number = x * (cellSize + spacing) + cellSize / 2; // Add spacing between boxes
                    let yPos: number = y * (cellSize + spacing) + cellSize / 2; // Add spacing between boxes
                    let zPos: number = layerIndex * (cellSize + spacing) + cellSize / 2; // Add spacing between boxes

                    s = !pair.stability
                    fill(s * 255, pair.bottomType * 10, pair.bottomType * 10, 80);

                    if (WEB_GL) {
                        push(); // Save the current transformation matrix
                        translate(xPos, yPos, zPos * 1.3);
                        box(shrunkSize, shrunkSize, -shrunkSize);
                        pop(); // Restore the previous transformation matrix
                    } else {
                        fill(pair.bottomType * 10, pair.bottomType * 10, pair.stability * 255, 100); // Use HSL color mode with hue, saturation, and lightness
                        rect(xPos, yPos, cellSize, cellSize);
                    }

                    if (pair.stability == 0)
                        fill(255, 0, 0); // Set fill color to black
                    else
                        fill(0, 255, 0);

                    if (WEB_GL) {
                        textStyle(NORMAL);
                    }
                    else {
                        textAlign(TOP, CENTER);
                        text(pair.topType + "-" + pair.bottomType, xPos + cellSize / 4, yPos + cellSize / 4); // Display pair properties
                        textAlign(BOTTOM, CENTER);
                        text(pair.magnitude.toFixed(2), xPos + cellSize / 4, yPos + cellSize / 2); // Display pair properties
                    }
                }
            }
        }
    }
}

let cam = {
    "x": vp / 2,
    "y": -vp / 2,
    "z": -vp / 4,
    "cx": vp / 2,
    "cy": vp / 2,
    "cz": vp,
    "xr": 180,
    "yr": 0,
}

function sign(x: number): number {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}
