export function VerticalGeneration(grid) {
    /**
        This function generates vertical walls with a gap of one so that the maze is solvable

        Return: A list of length 3, containing; 2d array of square objects, startNode position, endNode position
    */
 let gapList = [];
 for(let i=0; i<grid.length; i++) {
   gapList.push(Math.floor(Math.random()*15));
 }

 for(let i=0; i<grid.length; i++) {
   for(let j=0; j<grid[i].length; j++) {
     if(j % 2 !== 0) {
       if(i !== gapList[j]) {
         grid[i][j].colour = "#000000";
         grid[i][j].traversable = false;
       } else { grid[i][j].colour = "#FFFFFF"; }
     }
   }
 }
 return [grid, setStartNode(grid), setEndNode(grid)];
}

function setStartNode(grid) {
    /**
        Place startNode in a random row on column 0

        Return: startNode position
    */
 let randomDigit = Math.floor(Math.random()*grid.length);
 grid[randomDigit][0].startNode = true;
 grid[randomDigit][0].colour ="#0000FF"
 return grid[randomDigit][0];
}

function setEndNode(grid) {
    /**
        Place endNode in a random column on the end column

        Return: startNode position
    */
 let randomDigit = Math.floor(Math.random()*grid.length);
 grid[randomDigit][grid.length-1].startNode = true;
 grid[randomDigit][grid.length-1].colour ="#FF0000";
 return grid[randomDigit][grid.length-1];
}