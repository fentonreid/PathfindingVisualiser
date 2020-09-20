import React, { Component } from 'react';
import Square from './Square'
import {AStar} from '../.././searchAlgorithms/AStar'
import {Dfs} from '../.././searchAlgorithms/Dfs'
import {Bfs, BfsShortestPath} from '../.././searchAlgorithms/Bfs'
import {DfsGeneration} from '../.././mazeGeneration/DfsGeneration'
import {VerticalGeneration} from '../.././mazeGeneration/VerticalGeneration'
import {LandscapeGeneration} from '../.././mazeGeneration/LandscapeGeneration'

let startR = 0;
let startC = 0;
let endR = 13;
let endC = 5;

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            mouseDown : false,
            mouseOverStart : false,
            mouseOverEnd : false
        };
    }

    componentDidMount() {this.setState({grid : createGrid()});}

    visualiseAlgorithm() {
        /**
         This function visualises the algorithm the user choose from the dropdown menu
         Generate all the points the algorithm traversed and the shortest path from it

         Return: None
         */

         // get the value from the algorithmChoice  dropdown
        let algorithmChoice = document.getElementById("algorithmChoice").options[document.getElementById("algorithmChoice").selectedIndex].value;
        let traversedPoints = [];
        let shortestPath = [];

        if(algorithmChoice === "A*") {
            traversedPoints = AStar(this.state.grid, this.state.grid[startR][startC], this.state.grid[endR][endC]);
            shortestPath = this.getShortestPath(this.state.grid[endR][endC]);

        } else if(algorithmChoice === "DFS") {
            traversedPoints = Dfs(this.state.grid, this.state.grid[startR][startC], this.state.grid[endR][endC]);
            shortestPath = traversedPoints;

        } else if(algorithmChoice === "BFS") {
            traversedPoints = Bfs(this.state.grid, this.state.grid[startR][startC], this.state.grid[endR][endC]);
            shortestPath = BfsShortestPath(this.state.grid, this.state.grid[startR][startC], this.state.grid[endR][endC]);

        }
        
        // pass to be drawn to the board
        this.visualisePaths(traversedPoints, shortestPath);

    }

    visualisePaths(traversedPoints, shortestPath) {
        /**
            This function draws all points and the shortest path to the screen using the javascript SetTimeout method

            Return: None
        */
       let newGrid = this.state.grid;
       console.log(traversedPoints)
       console.log(shortestPath)

       for(let i=0; i<traversedPoints.length; i++) {
           setTimeout(
            function() {
             if((traversedPoints[i].row !== startR || traversedPoints[i].column !== startC) && (traversedPoints[i].row !== endR || traversedPoints[i].column !== endC)){
                 if(shortestPath.includes(traversedPoints[i])) {
                     newGrid[traversedPoints[i].row][traversedPoints[i].column].colour = "#00FFFF";
                 } else {
                     newGrid[traversedPoints[i].row][traversedPoints[i].column].colour = "#FFADAD";
                 }
                 this.setState({grid : newGrid});
             }
         }.bind(this), 1);
       }
   }


   getShortestPath(currentPoint) {
    /**
        This function takes a currentPoint and traverses through the parents until it reaches the start node

        Return: Returns a list of all parents from the currentPoint
    */
    let foundPath = [];
    currentPoint = currentPoint.parent;

    if(currentPoint == null) {
        return foundPath;
    }

    while(currentPoint.parent !== null || currentPoint !== this.state.grid[startR][startC]) {
      foundPath.push(this.state.grid[currentPoint.row][currentPoint.column]);
      currentPoint = currentPoint.parent;
  }
  return foundPath;
}

generateMaze() {
    /**
        This function creates a maze based on the users dropdown selection. Start and end are defined again as they can be overwritten by the maze algorithm

        Return: None

     */
    let mazeChoice = document.getElementById("mazeChoice").options[document.getElementById("mazeChoice").selectedIndex].value;
    let generation = [];

    this.clearColour("#0000FF");
    this.clearColour("#FF0000");

    if(mazeChoice === "DFS") { generation = DfsGeneration(this.state.grid); }
    else if(mazeChoice === "Horizontal") { generation = LandscapeGeneration(this.state.grid); }
    else if(mazeChoice === "Vertical") { generation = VerticalGeneration(this.state.grid); }

    startR = generation[1].row;
    startC = generation[1].column;
    endR = generation[2].row;
    endC = generation[2].column;

    this.setState({grid : generation[0]});
}

mouseDown(row, column) {
    /**
        This function is called when the mouse is clicked.
        The square currently clicked on is turned into a wall or left if the selected square is a start or end node

        Return: None
    */
            // if the mouse is down on the start node
            if(this.state.grid[row][column] === this.state.grid[startR][startC]) {
                this.setState({mouseOverStart : true});
            // else if the mouse is down on the end node
            } else if(this.state.grid[row][column] === this.state.grid[endR][endC]) {
              this.setState({mouseOverEnd : true});
          // else the mouse is down on a blank square, turn into a wall
          } else {
            this.setNonTraversable(row, column);
            this.setColour(row, column, "#FF00FF");
            this.setState({mouseOverStart : false});
        }
    }

    mouseOver(row, column) {
    /**
        This function is called when the mouse is being held down by the user i.e. dragging of the mouse.

        Return: None
    */
            // if mouse is down and we aren't dragging on the start node
            if(this.state.mouseDown && !this.state.mouseOverStart && !this.state.mouseOverEnd &&!(row === startR && column === startC) && !(row === endR && column === endC)) {
                this.setNonTraversable(row, column);
                this.setColour(row, column, "#FF00FF");

            // when we are dragging on the start node, change the start node positions
        } else if(this.state.mouseOverStart && !(row === endR && column === endC)) {
           this.setNonEmptyNode(row, column, "start");
            // when we are dragging on the end node, change the end node positions
       } else if(this.state.mouseOverEnd && !(row === startR && column === startC)) {
           this.setNonEmptyNode(row, column, "end");
       }
   }

   mouseUp(row, column) {
   /**
        When the mouse is released.

        Return: None
   */
    // change the state of all mouse events to false
    this.setState({mouseDown : false, mouseOverStart : false, mouseOverEnd : false});
}

setColour(row, column, colour) {
    /**
    Changes the row and column in the grid to that colour.

    Return: None
    */
    let newGrid = this.state.grid;
    newGrid[row][column].colour = colour;
    this.setState({grid : newGrid, mouseDown : true});
}

setNonTraversable(row, column) {
    /**
        Changes the square with a certain row and column index to be non traversable

        Return: None
    */
    let newGrid = this.state.grid;
    newGrid[row][column].traversable = false;
    this.setState({grid : newGrid});
}

setTraversable(row, column) {
    /**
        Changes the square with a certain row and column index to be traversable

        Return: None
    */
    let newGrid = this.state.grid;
    newGrid[row][column].traversable = true;
    this.setState({grid : newGrid});
}

setNonEmptyNode(row, column, point) {
    /**
        Updates the start and end node points if the location has changed

        Return: None
    */
    let colour = "";
    if(point === "start") {
     colour = "#0000FF";
     startR = row;
     startC = column;

 } else if(point === "end") {
    colour = "#FF0000";
    endR = row;
    endC = column;
}

this.setTraversable(row, column);
this.clearColour(colour);

this.setColour(row, column, colour);
}

clearColour(colour) {
     /**
        Removes the colour from the grid that matches the parameter colour

        Return: None
    */
    let newGrid = this.state.grid;

    for(let i=0; i<this.state.grid.length; i++) {
        for(let j=0; j<this.state.grid[i].length; j++) {
            if(newGrid[i][j].colour === colour) {
                newGrid[i][j].colour = "#FFFFFF";
            }
        }
    }
    this.setState({grid : newGrid});
}

clearAll(colour) {
     /**
        Set the grid back to its initial state

        Return: None
    */
    this.setState({grid : createGrid()});

}

render() {
    /**
        Draws the board, creating an instance for each square, also draws the maze and algorithm choice dropdowns and additional GUI.

        Return: None
    */
   return (
       <div>
       <label>Choose an algorithm: </label>
       <select id="algorithmChoice">
       <option value="A*">A*</option>
       <option value="DFS">DFS</option>
       <option value="BFS">BFS</option>
       <option value="Dijkstras">Dijkstras</option>
       </select><button onClick={this.visualiseAlgorithm.bind(this)}>Visualise Algorithm
       </button> <button onClick={this.clearAll.bind(this)}>Clear All</button>
       <p></p>
       <label>Choose maze generation: </label>
       <select id="mazeChoice">
       <option value="Vertical">Vertical Generation</option>
       <option value="Horizontal">Horizontal Generation</option>
       <option value="DFS">DFS</option>
       </select><button onClick={this.generateMaze.bind(this)}>Generate Maze</button><p></p>

       {this.state.grid.map((row, id) => {
           return (
             <div key={id}>
             <div className="gridRow">
             {row.map(square => {
                 return (
                   // create a square component
                   <Square
                   // pass through it's props
                   id = {square.row+"/"+square.column}
                   colour = {square.colour}
                   row = {square.row}
                   column = {square.column}
                   startNode = {square.startNode}
                   endNode = {square.endNode}
                   traversable = {square.traversable}
                   parentNode = {square.parentNode}
                   // passing through the mouse events
                   onMouseDown={(row, column) => this.mouseDown(square.row, square.column)}
                   onMouseUp={(row, column) => this.mouseUp(square.row, square.column)}
                   onMouseOver={(row, column) => this.mouseOver(square.row, square.column)}
                   />
                   );
             })}
                 </div>
                 </div>
                 );
             })}
             </div>
             );
       }
   }

   const createGrid = () => {
   /**
        Create a 2d grid of 25 by 25. Adding a start and end node and setting colour to each

        Return: A 2d grid of square object
   */
    let grid = [];

    for(let i=0; i<25; i++) {
        grid[i] = [];
        for(let j=0; j<25; j++) {
         grid[i].push(createSquare(i, j));
     }
     grid.push(grid[i]);
 }

 grid.pop(grid.length);

 grid[startR][startC].startNode = true;
 grid[endR][endC].endNode = true;

 if(grid[startR][startC].startNode) { grid[startR][startC].colour ="#0000FF"}
 if(grid[endR][endC].endNode) { grid[endR][endC].colour = "#FF0000"}

        return grid;
}

const createSquare = (row, column) => {
    /**
        Creating a square instance to be added to the grid.

        Return: None
    */
    return {
        // setting the attributes of the square object
        colour: "#FFFFFF",
        row : row,
        column : column,
        startNode : false,
        endNode : false,
        traversable : true,
        parent : null,
        isMouseDown : false
    };
}

export default Grid;