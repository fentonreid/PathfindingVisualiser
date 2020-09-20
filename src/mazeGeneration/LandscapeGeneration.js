export function LandscapeGeneration(grid) {
    /**
        This function generates horizontal walls with a gap of one so that the maze is solvable

        Return: A list of length 3, containing; 2d array of square objects, startNode position, endNode position
    */
 let gapList = [];
 for(let i=0; i<grid.length; i++) {
   gapList.push(Math.floor(Math.random()*grid.length));
 }

 for(let i=0; i<grid.length; i++) {
   for(let j=0; j<grid[i].length; j++) {
     if(i % 2 !== 0) {
       if(j !== gapList[i]) {
         grid[i][j].colour = "#000000";
         grid[i][j].traversable = false;
       } else {
        grid[i][j].colour = "#FFFFFF";
      }
    }
  }
}
return [grid, setStartNode(grid), setEndNode(grid)];
}

function setStartNode(grid) {
    /**
        Place startNode in a random column on row 0

        Return: startNode position
    */
 let randomDigit = Math.floor(Math.random()*grid.length);
 grid[0][randomDigit].startNode = true;
 grid[0][randomDigit].colour ="#0000FF"
 return grid[0][randomDigit];
}

function setEndNode(grid) {
    /**
        Place endNode in a random column at the last column

        Return: endNode position
    */
 let randomDigit = Math.floor(Math.random()*grid.length);
 grid[grid.length-1][randomDigit].startNode = true;
 grid[grid.length-1][randomDigit].colour ="#FF0000";
 return grid[grid.length-1][randomDigit];
}