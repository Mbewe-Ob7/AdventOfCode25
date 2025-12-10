const fs = require("fs");

// Read input file
function dataReadArr() {
    return fs.readFileSync("data.txt", "utf8").split("\n");
}

// ---------------------------------------------------------
// STEP 1: Parse input into problems
// Problems are separated by a FULL COLUMN OF SPACES
// ---------------------------------------------------------

function splitIntoProblems(lines) {
    // Convert each line into an array of characters
    const grid = lines.map(line => line.split(""));

    const width = Math.max(...grid.map(r => r.length));

    // Normalize row lengths
    for (let r = 0; r < grid.length; r++) {
        while (grid[r].length < width) grid[r].push(" ");
    }

    let problems = [];
    let cur = [];

    // Scan column-by-column to detect separators
    for (let col = 0; col < width; col++) {
        let isSeparator = true;

        for (let row = 0; row < grid.length; row++) {
            if (grid[row][col] !== " ") {
                isSeparator = false;
                break;
            }
        }

        if (isSeparator) {
            if (cur.length > 0) {
                problems.push(cur);
                cur = [];
            }
        } else {
            cur.push(col); // store active column
        }
    }

    if (cur.length > 0) {
        problems.push(cur);
    }

    return { grid, problems };
}

// ---------------------------------------------------------
// STEP 2: Extract numbers from a single problem block
// ---------------------------------------------------------

function solveProblem(grid, cols) {
    // last row contains operator
    const height = grid.length;
    const op = grid[height - 1][cols[0]].trim(); // + or *
    
    const numberRows = grid.slice(0, -1); // all rows except last
    
    let numbers = [];

    // Read columns RIGHT → LEFT
    for (let i = cols.length - 1; i >= 0; i--) {
        const col = cols[i];
        let digits = "";

        // For each row TOP → BOTTOM
        for (let row = 0; row < numberRows.length; row++) {
            const ch = numberRows[row][col];
            if (/\d/.test(ch)) digits += ch;
        }

        if (digits.length > 0) {
            numbers.push(Number(digits));
        }
    }

    // Compute result
    let total;
    if (op === "+") {
        total = numbers.reduce((a, b) => a + b, 0);
    } else {
        total = numbers.reduce((a, b) => a * b, 1);
    }

    return total;
}

// ---------------------------------------------------------
// STEP 3: Solve entire worksheet
// ---------------------------------------------------------

function solveWorksheet() {
    const lines = dataReadArr();

    const { grid, problems } = splitIntoProblems(lines);

    let grandTotal = 0;

    for (const p of problems) {
        const value = solveProblem(grid, p);
        grandTotal += value;
    }

    return grandTotal;
}

// ---------------------------------------------------------

console.log("Part 2 Grand Total =", solveWorksheet());
