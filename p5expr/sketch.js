let gridSize = 18; // Size of each layer in the grid
let numLayers = 18; // Total number of layers
let maxMagnitude = 50
let font;
let grid;
let WEB_GL = true
const vp = 1024


const stability_table = [
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

function checkStability(topType, bottomType) {
    return stability_table[bottomType][topType];
}

class Pair {
    constructor(x, y, topType, bottomType, magnitude = 1, pressure = 0, layer = 0) {
        this.x = x;
        this.y = y;
        this.topType = topType;
        this.bottomType = bottomType;
        this.magnitude = magnitude;
        this.pressure = pressure;
        this.layer = layer; // Default layer is 0 (Ground)
    }

    get stability() {
        return stability_table[this.bottomType][this.topType];
    }

    copy() {
        return new Pair(this.x, this.y, this.topType, this.bottomType, this.magnitude, this.pressure, this.layer);
    }

    toString() {
        return `${this.stability}${this.topType}${this.bottomType};${this.magnitude.toFixed(2)};${this.pressure.toFixed(2)};${this.layer}:${this.x}:${this.y}`;
    }
}

function randomIndividual(x, y, layer = 0) {
    const topType = Math.floor(Math.random() * 8) + 1;
    const bottomType = Math.floor(Math.random() * 8) + 1;
    const magnitude = 1; // Default magnitude is 1
    const pressure = 0; // Default pressure is 0

    return new Pair(x, y, topType, bottomType, magnitude, pressure, layer);
}

function initializeGrid(size, layerSize, popLayers = 0) {
    grid = [];

    // Layer 0 - Populated with random individuals
    for (let layerIndex = 0; layerIndex < layerSize; layerIndex++) {
        if (grid.length >= size) {
            break;
        }

        if (grid.length <= popLayers) {
            let layer = [];
            for (let x = 0; x < size; x++) {
                let col = [];
                layer.push(col);

                for (let y = 0; y < size; y++) {
                    col.push(randomIndividual(x, y, grid.length));
                }
            }
            grid.push(layer);
        } else {
            // Fill with a layer of the same size, all values null
            let emptyLayer = Array.from({ length: size }, () => Array(size).fill(null));
            grid.push(emptyLayer);
        }


    }
    // grid[0][10][10].topType = 4;
    // grid[0][10][10].bottomType = 7;

}



function simulateSingleTurn() {
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

function getPairGroup(pair, x, y) {
    let pairGroup = {};
    pairGroup["current"] = pair;
    pairGroup["north"] = y + 1 < gridSize ? grid[pair.layer][x][y + 1] : null;
    pairGroup["south"] = y - 1 >= 0 ? grid[pair.layer][x][y - 1] : null;
    pairGroup["east"] = x + 1 < gridSize ? grid[pair.layer][x + 1][y] : null;
    pairGroup["west"] = x - 1 >= 0 ? grid[pair.layer][x - 1][y] : null;
    pairGroup["up"] = pair.layer + 1 < numLayers ? grid[pair.layer + 1][x][y] : null;
    pairGroup["down"] = pair.layer > 0 ? grid[pair.layer - 1][x][y] : null;
    return pairGroup;
}

function updateMagnitude(pairGroup) {
    pairGroup["current"].magnitude += 0.1;
}

function updateStability(pairGroup) {
    let stability = 0;
    let pressure = 0;

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

function flipPair(flip, pairGroup) {
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

// Define smokeParticles array to hold smoke particles


function preload() {
    //loadFont("CourierPrime-Regular.ttf");
}

function setup() {
    cam_step = 200;
    if (WEB_GL) {
        document.addEventListener('keydown', function (event) {
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

//
// DRAW
//
function draw() {
    camera(cam.x, cam.y, cam.z, cam.cx, cam.cy, cam.cz);
    background(255);
    if (WEB_GL) {
        angleMode(DEGREES)
        rotateX(cam.xr);
        rotateY(cam.yr);

    }
    displayGrid();

    // Process a single turn
    simulateSingleTurn();
}

function displayGrid() {
    // Draw grid
    let cellSize = width / gridSize;
    let spacing = 0.1 * cellSize; // Define spacing between boxes
    let shrunkSize = 0.8 * cellSize; // Define the size of the shrunk boxes

    for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                let pair = grid[layerIndex][x][y];
                if (pair !== null) {
                    let xPos = x * (cellSize + spacing) + cellSize / 2; // Add spacing between boxes
                    let yPos = y * (cellSize + spacing) + cellSize / 2; // Add spacing between boxes
                    let zPos = layerIndex * (cellSize + spacing) + cellSize / 2; // Add spacing between boxes

                    // let xPos = x * cellSize;
                    // let yPos = y * cellSize;
                    // let zPos = layerIndex * cellSize
                    s = !pair.stability
                    fill(s * 255, pair.bottomType * 10, pair.bottomType * 10, 80);

                    if (WEB_GL) {


                        push(); // Save the current transformation matrix
                        translate(xPos, yPos, zPos * 1.3);
                        // Use HSL color mode with hue, saturation, and lightness
                        // box(cellSize, cellSize, -cellSize);
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
                        //textSize(12); // Set text size
                        textStyle(NORMAL); // Set text style
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


function sign(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}