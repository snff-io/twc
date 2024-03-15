// simulateSingleTurn(): void {
//     for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
//         for (let x = 0; x < gridSize; x++) {
//             for (let y = 0; y < gridSize; y++) {
//                 let pair = grid[layerIndex][x][y];
//                 if (pair !== null) {
//                     let pairGroup = getPairGroup(pair, x, y);
//                     updateMagnitude(pairGroup);
//                     let flip = updateStability(pairGroup);
//                     flipPair(flip, pairGroup);
//                 }
//             }
//         }
//     }
// }