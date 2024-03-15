

class Rules {

    public maxMagnitude: number = 50

    updateMagnitude(pairGroup: { [key: string]: Pair }): void {
        pairGroup["current"].magnitude += 0.1;
    }

    updateStability(pairGroup: { [key: string]: Pair }): boolean {
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
            } else if (Pair.checkStability(neighbor.topType, pairGroup["current"].topType) === 1) {
                stability += neighbor.magnitude;
            } else {
                pressure += neighbor.magnitude;
            }
        }

        if (pairGroup["up"] !== null) {
            if (Pair.checkStability(pairGroup["up"].bottomType, pairGroup["current"].topType) === 1) {
                stability += pairGroup["up"].magnitude;
            } else {
                pressure += pairGroup["up"].magnitude;
            }
        }

        if (pairGroup["down"] !== null) {
            if (Pair.checkStability(pairGroup["down"].topType, pairGroup["current"].bottomType) === 1) {
                stability += pairGroup["down"].magnitude;
            } else {
                pressure += pairGroup["down"].magnitude;
            }
        }

        return stability < pressure;
    }

    flipPair(grid: Grid, flip: boolean, pairGroup: { [key: string]: Pair }): void {
        if (flip) {
            if (pairGroup["current"].stability === 1) {
                if (pairGroup["current"].magnitude > this.maxMagnitude) {
                    if (pairGroup["current"].layer + 1 < grid.layerSize && pairGroup["up"] === null) {
                        pairGroup["up"] = pairGroup["current"].copy();
                        pairGroup["up"].layer = pairGroup["current"].layer + 1;
                        pairGroup["up"].topType = pairGroup["current"].bottomType;
                        pairGroup["up"].bottomType = pairGroup["current"].topType;
                        grid.layers[pairGroup["up"].layer][pairGroup["up"].x][pairGroup["up"].y] = pairGroup["up"];
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
                    grid.layers[pairGroup["current"].layer][pairGroup["current"].x][pairGroup["current"].y] = Pair.None;
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
}