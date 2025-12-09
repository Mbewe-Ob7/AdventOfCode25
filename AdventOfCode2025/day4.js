const fs = require('fs');

function dataReadArr() {
    const rotations = fs.readFileSync("data.txt", "utf8").trim().split("\n");
    return rotations;
}

let dimensional = [];
for (let line of dataReadArr()) {
    dimensional.push(line.split(""));
}

function isUp(col, row) {
    return dimensional[row - 1]?.[col] === "@";
}

function isDown(col, row) {
    return dimensional[row + 1]?.[col] === "@";
}

function isRight(col, row) {
    return dimensional[row]?.[col + 1] === "@";
}

function isLeft(col, row) {
    return dimensional[row]?.[col - 1] === "@";
}

function isTopLeft(col, row) {
    return dimensional[row - 1]?.[col - 1] === "@";
}

function isTopRight(col, row) {
    return dimensional[row - 1]?.[col + 1] === "@";
}

function isBottomRight(col, row) {
    return dimensional[row + 1]?.[col + 1] === "@";
}

function isBottomLeft(col, row) {
    return dimensional[row + 1]?.[col - 1] === "@";
}

let finalFinal = 0;
let final = -1;   // MUST START NON-ZERO or loop will never run

while (final !== 0) {

    final = 0;
    let toRemove = []; // store coordinates to change

    for (let row = 0; row < dimensional.length; row++) {
        for (let col = 0; col < dimensional[row].length; col++) {

            if (dimensional[row][col] !== "@") continue;

            let count = 0;

            if (isUp(col, row)) count++;
            if (isDown(col, row)) count++;
            if (isLeft(col, row)) count++;
            if (isRight(col, row)) count++;
            if (isTopLeft(col, row)) count++;
            if (isTopRight(col, row)) count++;
            if (isBottomLeft(col, row)) count++;
            if (isBottomRight(col, row)) count++;

            if (count < 4) {
                toRemove.push([row, col]);
            }
        }
    }

    // Apply removals AFTER scanning
    for (let [row, col] of toRemove) {
        dimensional[row][col] = "x";
    }

    final = toRemove.length;
    finalFinal += final;

    console.log("Accessible rolls of paper: " + final);
}

console.log("Total:", finalFinal);
