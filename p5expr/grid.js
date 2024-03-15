let gridSize = 20; // Size of each layer in the grid
let numLayers = 5; // Total number of layers

let grid;

function setup() {
  createCanvas(400, 400);
  initializeGrid(gridSize, numLayers);
}

function draw() {
  background(255);
  // Display grid
  displayGrid();
}

function randomIndividual(x, y) {
  let topType = Math.floor(Math.random() * 8) + 1; // Random top type between 1 and 8
  let bottomType = Math.floor(Math.random() * 8) + 1; // Random bottom type between 1 and 8
  return {
    x: x,
    y: y,
    topType: topType,
    bottomType: bottomType
  };
}

function initializeGrid(size, layerSize) {
  grid = [];

  // Layer 0 - Populated with random individuals
  for (let layerIndex = 0; layerIndex < layerSize; layerIndex++) {
    let layer = [];

    if (grid.length >= size) {
      break;
    }

    if (grid.length == 0) {
      for (let x = 0; x < size; x++) {
        let col = [];
        layer.push(col);

        for (let y = 0; y < size; y++) {
          col.push(randomIndividual(x, y));
        }
      }
      grid.push(layer);
    } else {
      // Fill with a layer of the same size, all values null
      let newLayer = Array.from({ length: size }, () => Array(size).fill(null));
      grid.push(newLayer);
    }
  }
}

function displayGrid() {
    // Draw grid
    let cellSize = width / gridSize;
    for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          let pair = grid[layerIndex][x][y];
          if (pair !== null) {
            let xPos = x * cellSize;
            let yPos = y * cellSize;
            fill(255); // Set fill color to white
            rect(xPos, yPos, cellSize, cellSize);
            fill(0); // Set fill color to black
            textAlign(CENTER, CENTER);
            text(pair.topType + "-" + pair.bottomType, xPos + cellSize / 2, yPos + cellSize / 2); // Display pair properties
          }
        }
      }
    }
  }

