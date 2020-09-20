import {getNeighbours} from './helperfunctions'

export function Dfs(grid, startNode, endNode) {
    /**
        Takes a grid, start and end node, and finds the path that connects the start to the end. Usually a sub-optimal solution

        Return: All visited points

    */
    let unvisitedPoints = [];
    unvisitedPoints.push(startNode);
    let explored = [];

    while(unvisitedPoints.length !== 0) {
        let currentNode = unvisitedPoints.pop();

        if(explored.includes(currentNode)) {continue;}
        if(currentNode === endNode) {return explored;}

        let neighbours = getNeighbours(currentNode, grid);

        neighbours.forEach(function(neighbour) {
           unvisitedPoints.push(neighbour)
        });
           explored.push(currentNode);
        }
    return explored;
}