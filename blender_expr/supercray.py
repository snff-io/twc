import bpy
import random

def create_cube(location, scale):
    bpy.ops.mesh.primitive_cube_add(location=location, scale=scale)

def update_cube_color(cube_obj, color):
    # Set cube material color
    cube_obj.active_material.diffuse_color = color

def visualize_grid(grid, cube_scale):
    for layer_index, layer in enumerate(grid):
        for x, row in enumerate(layer):
            for y, cell in enumerate(row):
                if cell is not None:
                    # Calculate cube location based on grid coordinates
                    location = (x * cube_scale, y * cube_scale, layer_index * cube_scale)
                    
                    # Create or select cube object
                    if bpy.data.objects.get(f"Cube_{x}_{y}_{layer_index}"):
                        cube_obj = bpy.data.objects[f"Cube_{x}_{y}_{layer_index}"]
                    else:
                        create_cube(location, (cube_scale, cube_scale, cube_scale))
                        cube_obj = bpy.context.object
                        cube_obj.name = f"Cube_{x}_{y}_{layer_index}"

                    # Update cube color based on cell data
                    color = (cell.top_type / 8, cell.bottom_type / 8, cell.magnitude / maxMagnitude, 1.0)
                    update_cube_color(cube_obj, color)

# Example usage
size = 18
layer_size = 18

# Function to set shape key
def set_shape_key(cube, magnitude):
    shape_key = cube.shape_key_add(name="Key_" + str(magnitude), from_mix=False)
    shape_key.value = magnitude  # Set the value of the shape key

# Function to simulate single turn
def simulate_single_turn(grid, gridSize, numLayers):
    for layerIndex in range(numLayers):
        for x in range(gridSize):
            for y in range(gridSize):
                pair = grid[layerIndex][x][y]
                if pair is not None:
                    pairGroup = get_pair_group(pair, x, y, gridSize, numLayers)
                    update_magnitude(pairGroup)
                    flip = update_stability(pairGroup)
                    flip_pair(flip, pairGroup)

# Function to get pair group
def get_pair_group(pair, x, y, gridSize, numLayers):
    pairGroup = {}
    pairGroup["current"] = pair
    pairGroup["north"] = grid[pair.layer][x][y + 1] if y + 1 < gridSize else None
    pairGroup["south"] = grid[pair.layer][x][y - 1] if y - 1 >= 0 else None
    pairGroup["east"] = grid[pair.layer][x + 1][y] if x + 1 < gridSize else None
    pairGroup["west"] = grid[pair.layer][x - 1][y] if x - 1 >= 0 else None
    pairGroup["up"] = grid[pair.layer + 1][x][y] if pair.layer + 1 < numLayers else None
    pairGroup["down"] = grid[pair.layer - 1][x][y] if pair.layer > 0 else None
    return pairGroup

# Function to update magnitude
def update_magnitude(pairGroup):
    pairGroup["current"].magnitude += 0.1

# Function to update stability
def update_stability(pairGroup):
    stability = 0
    pressure = 0

    if pairGroup["current"].stability == 1:
        stability += pairGroup["current"].magnitude
    else:
        pressure += pairGroup["current"].magnitude

    for direction in ["north", "south", "east", "west"]:
        neighbor = pairGroup[direction]
        if neighbor is None:
            pressure += 0.9
        elif check_stability(neighbor.topType, pairGroup["current"].topType) == 1:
            stability += neighbor.magnitude
        else:
            pressure += neighbor.magnitude

    if pairGroup["up"] is not None:
        if check_stability(pairGroup["up"].bottomType, pairGroup["current"].topType) == 1:
            stability += pairGroup["up"].magnitude
        else:
            pressure += pairGroup["up"].magnitude

    if pairGroup["down"] is not None:
        if check_stability(pairGroup["down"].topType, pairGroup["current"].bottomType) == 1:
            stability += pairGroup["down"].magnitude
        else:
            pressure += pairGroup["down"].magnitude

    return stability < pressure

# Function to flip pair
def flip_pair(flip, pairGroup):
    if flip:
        if pairGroup["current"].stability == 1:
            if pairGroup["current"].magnitude > maxMagnitude:
                if pairGroup["current"].layer + 1 < numLayers and pairGroup["up"] is None:
                    pairGroup["up"] = pairGroup["current"].copy()
                    pairGroup["up"].layer = pairGroup["current"].layer + 1
                    pairGroup["up"].topType = pairGroup["current"].bottomType
                    pairGroup["up"].bottomType = pairGroup["current"].topType
                    grid[pairGroup["up"].layer][pairGroup["up"].x][pairGroup["up"].y] = pairGroup["up"]
                pairGroup["up"].magnitude = pairGroup["current"].magnitude / 2
                pairGroup["current"].magnitude = pairGroup["current"].magnitude / 2
        else:
            directions = ["up", "down", "north", "south", "east", "west"]
            neighbors = sum(1 for direction in directions if pairGroup[direction] is not None)
            for direction in directions:
                if pairGroup[direction] is not None:
                    pairGroup[direction].magnitude += 0.1 / neighbors
            temp = pairGroup["current"].topType
            pairGroup["current"].topType = pairGroup["current"].bottomType
            pairGroup["current"].bottomType = temp
            pairGroup["current"].magnitude -= 1
            if pairGroup["current"].magnitude < 1 and pairGroup["current"].layer == 0:
                pairGroup["current"].magnitude = 1
            if pairGroup["current"].magnitude < 0:
                grid[pairGroup["current"].layer][pairGroup["current"].x][pairGroup["current"].y] = None
    else:
        if pairGroup["current"].stability == 1:
            pairGroup["current"].magnitude += 0.1
        else:
            directions = ["up", "down", "north", "south", "east", "west"]
            neighbors = sum(1 for direction in directions if pairGroup[direction] is not None)
            for direction in directions:
                if pairGroup[direction] is not None:
                    pairGroup[direction].magnitude += 0.1 / neighbors


def initializeGrid(grid, size, layerSize, popLayers=0):
    # Layer 0 - Populated with random individuals
    for layerIndex in range(layerSize):
        if len(grid) >= size:
            break

        if len(grid) <= popLayers:
            layer = []
            for x in range(size):
                col = []
                layer.append(col)

                for y in range(size):
                    col.append(randomIndividual(x, y, len(grid)))
            grid.append(layer)
        else:
            # Fill with a layer of the same size, all values null
            emptyLayer = [[None] * size for _ in range(size)]
            grid.append(emptyLayer)
            
# Main script
def main():
    # Clear existing objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

    # Set up grid parameters
    gridSize = 18
    numLayers = 18
    maxMagnitude = 50

    # Create grid
    grid = [[[None for _ in range(gridSize)] for _ in range(gridSize)] for _ in range(numLayers)]

    # Initialize grid
    initializeGrid(grid, gridSize, numLayers)

    # Set up animation parameters
    bpy.context.scene.frame_start = 0
    bpy.context.scene.frame_end = 100  # Adjust frame range as needed

    # Animate grid
    for frame in range(100):
        simulate_single_turn(grid, gridSize, numLayers)
        visualize_grid(grid, cube_scale=1.0)

if __name__ == "__main__":
    main()
