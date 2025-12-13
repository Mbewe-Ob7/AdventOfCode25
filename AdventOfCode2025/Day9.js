const fs = require("fs");

function data() {
  let arr = fs.readFileSync("data.txt", "utf8").trim().split("\n");
  let points = arr.map(m => m.split(",").map(Number));

  let maxDistance = 0;
  let maxPair = null;
    //bubble sort concept
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let [x1, y1] = points[i];
      let [x2, y2] = points[j];
      //so we are going to change this bottom part mostly
      let xdiff = Math.abs(x2 - x1);
      let ydiff = Math.abs(y2 - y1);
      //im gonna use it as dist
      let dist = xdiff * ydiff; 

      if (dist > maxDistance) {
        maxDistance = dist;
        maxPair = [points[i], points[j]];
      }
    }
  }

  return { maxDistance, maxPair };
}

// Example usage:
const result = data();
let row = result.maxPair.map(xValue => xValue[0]);
let col = result.maxPair.map(yValue => yValue[1]);

let len = Math.abs(row[0] - row[1]) + 1; 
let breathe = (Math.abs(col[0] - col[1])) + 1; 

//Area
console.log(result.maxPair)
console.log(len * breathe); 
