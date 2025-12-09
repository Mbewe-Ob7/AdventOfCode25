const fs = require('fs');

function dataReadArr(path = "data.txt") {
  const raw = fs.readFileSync(path, "utf8");
  // split on both \n and \r\n, trim each line, drop empty lines
  return raw
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// return the lexicographically largest subsequence of length k (k = 12 here)
function maxK(line, k = 12) {
  if (line.length <= k) return line; // nothing to remove
  let remove = line.length - k;
  const stack = [];

  for (let ch of line) {
    while (
      remove > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < ch
    ) {
      stack.pop();
      remove--;
    }
    stack.push(ch);
  }

  return stack.slice(0, k).join("");
}

// --- Optional quick test with the example from the prompt ---
function runExampleTest() {
  const example = [
    "987654321111111",
    "811111111111119",
    "234234234234278",
    "818181911112111"
  ];
  const expected = [
    "987654321111",
    "811111111119",
    "434234234278",
    "888911112111"
  ];
  const got = example.map(line => maxK(line, 12));
  console.log("Example results:", got);
  console.log("Expected results:", expected);
  const sumGot = got.reduce((acc, s) => acc + BigInt(s), 0n);
  console.log("Example SUM (should be 3121910778619):", sumGot.toString());
  console.log("--- end example test ---\n");
}

// Uncomment the next line to run the example check
runExampleTest();

// --- Main program ---
const lines = dataReadArr("data.txt");
let total = 0n;

for (let line of lines) {
  const best = maxK(line, 12);
  // BigInt conversion — safe even for very large numbers
  total += BigInt(best);
}

console.log("FINAL TOTAL joltage =", total.toString());
