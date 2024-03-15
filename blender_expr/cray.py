import numpy as np
from typing import Dict
import os

# Stability table with node types
stability_table = np.array([
    [-1, 1, 2, 3, 4, 5, 6, 7, 8],
    [1, 1, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 1, 1, 1],
    [3, 1, 0, 1, 1, 1, 1, 0, 0],
    [4, 1, 0, 0, 1, 1, 1, 0, 0],
    [5, 1, 0, 0, 0, 1, 0, 0, 0],
    [6, 1, 0, 0, 0, 1, 1, 0, 0],
    [7, 1, 0, 0, 0, 1, 1, 1, 1],
    [8, 1, 0, 0, 1, 1, 1, 0, 1]
])

def check_stability(top_type, bottom_type):
    return stability_table[top_type, bottom_type]
    
class Pair:
    def __init__(self, x, y, top_type, bottom_type, magnitude=1, pressure=0, layer=0):
        self.x = x
        self.y = y
        self.top_type = top_type
        self.bottom_type = bottom_type
        self.magnitude = magnitude
        self.pressure = pressure
        self.layer = layer  # Default layer is 0 (Ground)

    @property
    def stability(self):
        return stability_table[self.top_type][self.bottom_type]

    def copy(self):
        return Pair(self.x, self.y, self.top_type, self.bottom_type,self.magnitude, self.pressure, self.layer)

    def __str__(self):
        return f"{self.stability}{self.top_type}{self.bottom_type};{self.magnitude:.2f};{self.pressure:.2f};{self.layer}:{self.x}:{self.y}"

def random_individual(x, y):
    top_type = np.random.randint(1, 9)
    bottom_type = np.random.randint(1, 9)
    magnitude = 1  # Default magnitude is 1
    pressure = 0   # Default pressure is 0
    layer = 0
 
    return Pair(x, y, top_type, bottom_type, magnitude, pressure, layer)


def initialize_grid(size):
    grid = []

    # Layer 0 - Populated with random individuals
    for layer in range(size):
        layer = []

        if len(grid) >= layer_size:
            break

        if (len(grid) == 0):
            
            grid.append(layer)
            for x in range(size):
                col = []
                layer.append(col)
                
                for y in range(size):
                        col.append(random_individual(x,y))
        else:
            # Fill with a layer of the same size, all values null
            new_layer = [[None] * size for _ in range(size)]
            grid.append(new_layer)
    return grid

def get_pair_group(grid, pair, size):
    pair_group = {}
    pair_group["current"] = pair
    pair_group["north"] = grid[pair.layer][pair.x][pair.y+1] if pair.y+1 < size else None
    pair_group["south"] = grid[pair.layer][pair.x][pair.y-1] if pair.y-1 >=0 else None
    pair_group["east"] = grid[pair.layer][pair.x+1][pair.y] if pair.x+1 < size else None
    pair_group["west"] = grid[pair.layer][pair.x-1][pair.y] if pair.x-1 >= 0 else None 
    pair_group["up"] = grid[pair.layer+1][pair.x][pair.y] if pair.layer+1 < size else None 
    pair_group["down"] = grid[pair.layer-1][pair.x][pair.y] if pair.layer > 0 < size else None
    return pair_group    


def print_pg(pg):
    print("up :\t\t\t\t\t\t\t\t\t\t" + str(pg["up"]))
    print("no :\t\t\t\t" + str(pg["north"]))
    print("wce:\t" + str(pg["west"]) + "\t" + str(pg["current"]) + "\t" + str(pg["east"]))
    print("so :\t\t\t\t" + str(pg["south"])) 
    print("dn :\t\t\t\t\t\t\t\t\t\t" + str(pg["down"]))


def update_magnitude(pair_group: Dict[str, Pair]):
    pair_group["current"].magnitude += .1
    # incase we are super unstable
    # for pair in pair_group.values():
    #     pair.magnitude += .1
        

def update_stability(pair_group: Dict[str, Pair]):
    pg = pair_group

    stability=0
    pressure = 0
    magnitude = 0
    
    if pair_group["current"].stability == 1:
        stability += pair_group["current"].magnitude
    else:
        pressure += pair_group["current"].magnitude

    for p in ["north","south","east","west"]:
        if pg[p] == None:
            pressure += .9
        elif check_stability(pg[p].top_type, pg["current"].top_type) == 1:
            stability += pg[p].magnitude
        else:
            pressure += pg[p].magnitude

    if pg["up"] != None:
        if check_stability(pg["up"].bottom_type,pg["current"].top_type) == 1:
            stability += pg["up"].magnitude
        else:
            pressure += pg["up"].magnitude

    if pg["down"] != None:
        if check_stability(pg["down"].top_type, pg["current"].bottom_type) == 1:
            stability += pg["down"].magnitude
        else:
            pressure += pg["down"].magnitude   

    flip = stability < pressure

    return flip

def flip_pair(grid, flip, pair_group: Dict[str, Pair]):
    destroy = False
    if (flip):
        #if stable pair, release energy (mag) up TODO: Layer height check
        if (pair_group["current"].stability == 1 and pair_group["current"].magnitude > 20):
            if pair_group["current"].layer + 1 <= layer_size:
                if pair_group["up"] == None:
                    pair_group["up"] = pair_group["current"].copy()
                    pair_group["up"].layer = pair_group["current"].layer + 1
                    pair_group["up"].x = pair_group["current"].x
                    pair_group["up"].y = pair_group["current"].y                
                    grid[pair_group["up"].layer][pair_group["up"].x][pair_group["up"].y] = pair_group["up"]
                    pair_group["up"].top_type = pair_group["current"].bottom_type
                    pair_group["up"].bottom_type = pair_group["current"].top_type
                    grid[pair_group["up"].layer][pair_group["up"].x][pair_group["up"].y] = pair_group["up"]

                pair_group["up"].magnitude = pair_group["current"].magnitude / 2  
                pair_group["current"].magnitude = pair_group["current"].magnitude / 2

                print("going up!")
                print_pg(pair_group)
        else:
            #if unstable, release energy evenly to all valid neighbors
            directions = ["up", "down", "north", "south", "east", "west"]
            neighbors = sum(1 for p in directions if pair_group[p] is not None)
            for p in directions:
                if pair_group[p] is not None:
                    pair_group[p].magnitude += .1 / neighbors
            tt = pair_group["current"].top_type
            bt = pair_group["current"].bottom_type
            pair_group["current"].top_type = bt
            pair_group["current"].bottom_type = tt
            pair_group["current"].magnitude -= 1
            
            if pair_group["current"].magnitude < 1 and pair_group["current"].layer == 0:
                pair_group["current"].magnitude = 1

            if pair_group["current"].magnitude < 0:
                destroy = True
    else:
        if (pair_group["current"].stability == 1):
            pair_group["current"].magnitude += .1
        else:
            directions = ["up", "down", "north", "south", "east", "west"]
            neighbors = sum(1 for p in directions if pair_group[p] is not None)
            for p in directions:
                if pair_group[p] is not None:
                    pair_group[p].magnitude += .1 / neighbors

def simulate_single_turn(grid, size):

    for layer in range(layer_size):
        for x in range(size):
            for y in range(size):
                if  grid[layer][x][y] == None:
                    continue
                pair_group = get_pair_group(grid, grid[layer][x][y], size)
                update_magnitude(pair_group)
                flip = update_stability(pair_group)
                destroy = flip_pair(grid, flip, pair_group)
                if (destroy):
                     grid[layer][x][y] = None
    return grid


import bpy

def create_cube(x, y, z):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z))

def render_grid(grid):
    for layer in range(len(grid)):
        for x in range(len(grid[layer])):
            for y in range(len(grid[layer][x])):
                if grid[layer][x][y] is not None:
                    # Assuming grid coordinates map to Blender scene
                    x_coord = x * 2  # Adjust scale as needed
                    y_coord = y * 2
                    z_coord = layer * 2
                    create_cube(x_coord, y_coord, z_coord)

# Assuming 'grid' is your initialized grid

size = 18
layer_size = 18
grid = initialize_grid(size)
render_grid(grid)
# for _ in range(100):
#     grid = simulate_single_turn(grid, size)
#     pg = get_pair_group(grid, grid[0][150][150], size)
#     print_pg(pg)