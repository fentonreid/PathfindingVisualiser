import {getNeighbours} from './helperfunctions'

export function Bfs(grid, startNode, endNode) {
    /**
        Takes a grid, start and end node and finds the shortest path to the destination

        Return: List of explored points
    */
    let unvisitedPoints = [];
    unvisitedPoints.push(startNode);
    let explored = [];

    while(unvisitedPoints.length !== 0) {
        let currentPoint = unvisitedPoints.shift();

        if(explored.includes(currentPoint)) {continue;}
        if(currentPoint === endNode){
            return explored;
        }

        let neighbours = getNeighbours(currentPoint, grid);

        neighbours.forEach(function(neighbour) {
            neighbour.parent = currentPoint;
            unvisitedPoints.push(neighbour);
        });
        explored.push(currentPoint);
    }
    return explored;
}

export function BfsShortestPath(grid, startNode, endNode) {
    /**
        This function returns the shortest path. Loops through from the endNodes parents until is reaches the startNode

        Return: A list of points
    */
    let explored = [];
    startNode.discovered = true;
    explored.push(startNode);

    while(explored.length !== []) {
        let currentPoint = explored.shift();

        if (currentPoint === endNode) {
           let foundPath = [];
           currentPoint = currentPoint.parent;

           while(currentPoint !== startNode) {
             foundPath.push(grid[currentPoint.row][currentPoint.column]);
             currentPoint = currentPoint.parent;
         }
         return foundPath;
     }

     let neighbours = getNeighbours(currentPoint, grid);
     neighbours.forEach(function(neighbour) {
        if (!neighbour.discovered) {
           neighbour.discovered = true;
           neighbour.parent = currentPoint;

           explored.push(neighbour);
       }
   });
 }
}