const fs = require('fs');

// Read your rotations from a file called "data.txt"
const rotations = fs.readFileSync("data.txt", "utf8")
    .trim()
    .split("\n");

let dial = 50;           // dial starts at 50
const DIAL_MAX = 99;     // numbers go 0–99
let zeroCount = 0;       // password count

for (let line of rotations) {
    let dir = line[0];              // 'L' or 'R'
    let distance = parseInt(line.slice(1)); // how many clicks

    if (distance === 0) continue;

    // Compute number of full loops (every 100 clicks passes 0 exactly once)
    let fullLoops = Math.floor(distance / 100);
    zeroCount += fullLoops;

    // Remaining clicks after full loops
    let remainder = distance % 100;

    if (dir === 'L') {
        // Moving left (subtract), wrap around 0–99
        for (let i = 1; i <= remainder; i++) {
            dial = (dial - 1 + 100) % 100;
            if (dial === 0) zeroCount++;
        }
    } else {
        // Moving right (add), wrap around 0–99
        for (let i = 1; i <= remainder; i++) {
            dial = (dial + 1) % 100;
            if (dial === 0) zeroCount++;
        }
    }
}

console.log("Password (total zero hits):", zeroCount);
