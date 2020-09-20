    import {manhattanDistance, getNeighbours} from './helperfunctions'

function createPoints(grid) {
        /**
            Creates a 2d array called searchSpace, that adds f,g,h values to each item in the passed in grid

            Return: A 2d array
        */
        // create 2d point array from grid
        let searchSpace = [];
        for(let i=0; i<grid.length; i++) {
            searchSpace[i] = [];
            for(let j=0; j<grid[i].length; j++) {
                searchSpace[i].push(grid[i][j]);
                searchSpace[i][j].f = 0;
                searchSpace[i][j].g = 0;
                searchSpace[i][j].h = 0;
                searchSpace[i][j].traversable = grid[i][j].traversable;
            }
            searchSpace.push(searchSpace[i]);
        }
        return searchSpace;
    }

    export function AStar(grid, s, e) {
        /**
            Runs aStar on the passed in grid. Using the startNode as the initial node until it reaches the end node

            Return: A list of all visited points
        */
     let searchSpace = createPoints(grid);
    // get our start and end nodes and define our found path as empty
    let startNode = grid[s.row][s.column];
    let endNode = grid[e.row][e.column];

    // define our empty arrays
    let openList = [];
    let closedList = [];
    let traversedPoints = [];

    let currentPoint = null;
    openList.push(startNode);

    while(openList.length !== 0) {
        let lowestFCost = openList[0].f;
        let position = 0;

        for(let i=0; i<openList.length; i++) {
            if (openList[i].f < lowestFCost) {
                lowestFCost = openList[i].f;
                position = i;
            }
        }

        currentPoint = openList[position];
        openList.splice(position, 1);
        closedList.push(currentPoint);

        if(currentPoint === e) {
            return traversedPoints;
        }

        currentPoint.neighbours = getNeighbours(currentPoint, searchSpace);

        currentPoint.neighbours.forEach(function(neighbour) {
            if(closedList.includes(neighbour)) {return;}

            neighbour.g = currentPoint.g + 1;
            neighbour.h = manhattanDistance(neighbour, endNode);
            neighbour.f = neighbour.g + neighbour.h;

            traversedPoints.push(neighbour);

            if(!openList.includes(neighbour)) {
                neighbour.f = (currentPoint.g + 1) + (manhattanDistance(neighbour, endNode));
                neighbour.parent = currentPoint;
                openList.push(neighbour);
            }
        });
    }
    return traversedPoints;
}