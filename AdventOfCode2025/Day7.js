const fs = require("fs");

// Read grid from input file
let grid = fs.readFileSync("data.txt", "utf8")
    .trim()
    .split("\n")
    .map(line => line.split(""));

// Find start position S
let start = grid.reduce((acc, row, r) => {
    row.forEach((char, c) => {
        if (char === "S") acc = [r, c];
    });
    return acc;
}, []);

// Memoization cache
let cache = new Map();

function solve(r, c) {
    let key = `${r},${c}`;
    if (cache.has(key)) return cache.get(key);

    if (r >= grid.length) return 1; // Reached bottom

    let val = grid[r][c];
    let result = 0;

    if (val === "." || val === "S") {
        result = solve(r + 1, c); // Move down
    } else if (val === "^") {
        result = solve(r + 1, c - 1) + solve(r + 1, c + 1); // Split left & right
    }

    cache.set(key, result);
    return result;
}

console.log(solve(...start));
