export function manhattanDistance(neighbour, endNode) {
    /**
        This is our distance heuristic, it calculates the distance between a current node and the goal end node

        Return: A positive integer distance from current node to the goal

    */
    return Math.abs(endNode.row - neighbour.row) + Math.abs(endNode.column - neighbour.column);
}

export function getNeighbours(currentPoint, searchSpace) {
    /**

    This function calculates all the neighbours of a current node

    Return: A list of all neighbours of the current node that are traversable i.e. not walls
    */
    let neighbours = [];
    let row = currentPoint.row;
    let column = currentPoint.column;

    if(row > 0 && column > 0) neighbours.push(searchSpace[row-1][column-1]);
    if(row > 0) neighbours.push(searchSpace[row-1][column]);
    if(column > 0) neighbours.push(searchSpace[row][column-1]);
    if(row < searchSpace.length-1) neighbours.push(searchSpace[row+1][column]);
    if(column < searchSpace[column].length-1) neighbours.push(searchSpace[row][column+1]);
    if(row < searchSpace.length-1 && column < searchSpace[row].length-1) neighbours.push(searchSpace[row+1][column+1]);
    if(row < searchSpace.length-1 && column > 0) neighbours.push(searchSpace[row+1][column-1]);
    if(row > 0 && column < searchSpace[column].length-1) neighbours.push(searchSpace[row-1][column+1]);

    return neighbours.filter(neighbour => neighbour.traversable);
}