 class Grid {
    public layers: Pair[][][] = [];

    constructor(
        public layerSize: number = 379, // Size of each layer in the grid
    ) { }

    init(populateLayers = 0): void {
        for (let layerIndex = 0; layerIndex < this.layerSize; layerIndex++) {
            let layer: Pair[][] = [];
            for (let x = 0; x < this.layerSize; x++) {
                let col: Pair[] = [];
                layer.push(col);

                for (let y = 0; y < this.layerSize; y++) {
                    if (layerIndex < populateLayers) {
                        col.push(Pair.randomIndividual(x, y, layerIndex));
                    } else {
                        col.push(Pair.None); // Populate with Pair.None
                    }
                }
            }
            this.layers.push(layer);
        }
    }

    get_populated_layers() : Pair[][][] {
        var popLayers: Pair[][][] = [];

        this.layers.forEach(layer => {
            if (LINQ.asEnumerable(layer).Any(pair => !pair.equals(Pair.None))) {
                popLayers.push(layer);
            }
        });

        return popLayers;
    }
}
