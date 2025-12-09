const fs = require('fs');


function dataReadArr() {
    return fs.readFileSync("data.txt", "utf8").trim().split("\n");
}

let ranges = [];
let trigger = false;

for (let arr of dataReadArr()) {
    if (arr.trim() === "") {
        trigger = true;
        continue;
    }

    if (!trigger) {
        ranges.push(arr.split("-").map(Number));
    }
}

ranges.sort((a, b) => a[0] - b[0]);


let merged = [];
let [curStart, curEnd] = ranges[0];

for (let i = 1; i < ranges.length; i++) {
    let [start, end] = ranges[i];

    if (start <= curEnd + 1) { 
        curEnd = Math.max(curEnd, end);
    } else {
        merged.push([curStart, curEnd]);
        curStart = start;
        curEnd = end;
    }
}
merged.push([curStart, curEnd]);


let total = 0;
for (let [start, end] of merged) {
    total += (end - start + 1);
}

console.log("IDs:", total);
