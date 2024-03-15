"use strict";
class Grid {
    layerSize;
    layers = [];
    constructor(layerSize = 379) {
        this.layerSize = layerSize;
    }
    init(populateLayers = 0) {
        for (let layerIndex = 0; layerIndex < this.layerSize; layerIndex++) {
            let layer = [];
            for (let x = 0; x < this.layerSize; x++) {
                let col = [];
                layer.push(col);
                for (let y = 0; y < this.layerSize; y++) {
                    if (layerIndex < populateLayers) {
                        col.push(Pair.randomIndividual(x, y, layerIndex));
                    }
                    else {
                        col.push(Pair.None); // Populate with Pair.None
                    }
                }
            }
            this.layers.push(layer);
        }
    }
    get_populated_layers() {
        var popLayers = [];
        this.layers.forEach(layer => {
            if (LINQ.asEnumerable(layer).Any(pair => !pair.equals(Pair.None))) {
                popLayers.push(layer);
            }
        });
        return popLayers;
    }
}
//# sourceMappingURL=Grid.js.map