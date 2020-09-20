function getNeighbours(currentPoint, searchSpace) {
    /**
        This function gets the currentPoints 4 neighbours, excluding diagonals

        Return: A list of all neighbours that haven't already been discovered
    */
   let neighbours = [];
   let row = currentPoint.row;
   let column = currentPoint.column;

   if(row > 0) neighbours.push(searchSpace[row-1][column]);
   if(column > 0) neighbours.push(searchSpace[row][column-1]);
   if(row < searchSpace.length-1) neighbours.push(searchSpace[row+1][column]);
   if(column < searchSpace[column].length-1) neighbours.push(searchSpace[row][column+1]);

   return neighbours.filter(neighbour => !neighbour.discovered);
}

function makeAllWalls(grid) {
    /**
    This function turns all points into walls

    Return: Grid with all walls filled in
    */
    for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[i].length; j++) {
            grid[i][j].colour = "#000000";
            grid[i][j].discovered = false;
            grid[i][j].traversable = false;
        }
    }
    return grid;
}

export function DfsGeneration(grid) {
    /**
        This function places empty spaces into the grid of all walls. Stops when all neighbours are discovered

        Return: Grid
    */
    grid = makeAllWalls(grid);
    let explored = [grid[0][0]];
    let exploredXY = []
    grid[0][0].discovered = true;

    while(explored.length !== 0) {
        let currentPoint = explored.pop();
        let neighbours = getNeighbours(currentPoint, grid);
        if(neighbours.length !== 0){
            let randomNeighbour = neighbours[Math.floor(Math.random()*neighbours.length)];
            grid[randomNeighbour.row][randomNeighbour.column].colour = "#FFFFFF";
            randomNeighbour.discovered = true;
            randomNeighbour.traversable = true;
            explored.push(randomNeighbour);
            exploredXY.push([randomNeighbour.row, randomNeighbour.column])
        }
    }
 let nodes = setNodes(grid, exploredXY)
 return [grid, nodes[0], nodes[1]];
}


function setNodes(grid, explored) {

    // generate startNode position
    // get a random element from the explored list
    let randomDigit = Math.floor(Math.random()*explored.length);

    grid[explored[randomDigit][0]][explored[randomDigit][1]].startNode = true;
    grid[explored[randomDigit][0]][explored[randomDigit][1]].colour ="#0000FF";

    let startNode = grid[explored[randomDigit][0]][explored[randomDigit][1]]

    explored.splice(randomDigit, 1)

    // generate endNode position
    // get a random element from the explored list
    randomDigit = Math.floor(Math.random()*explored.length);

    grid[explored[randomDigit][0]][explored[randomDigit][1]].endNode = true;
    grid[explored[randomDigit][0]][explored[randomDigit][1]].colour ="#FF0000";

    let endNode = grid[explored[randomDigit][0]][explored[randomDigit][1]]

    return [startNode, endNode];
}