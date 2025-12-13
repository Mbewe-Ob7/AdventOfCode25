const fs = require('fs');

// --- CONFIG ---
// For Part One: number of closest pairs to connect
// For the example: 10, for full puzzle input: 1000
const NUM_PAIRS = 1000;

// --- Step 1: Read input ---
function data() {
    return fs.readFileSync("data.txt", "utf-8").trim().split("\n");
}

// --- Step 2: Compute 3D distance ---
function distance3D(aArr, bArr) {
    let [x1, y1, z1] = aArr;
    let [x2, y2, z2] = bArr;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

// --- Step 3: Read points and convert to numbers ---
let arr = data().map(line => line.split(",").map(Number));

// --- Step 4: Generate all pairs and distances ---
let distances = [];
for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        distances.push({
            a: i,
            b: j,
            dist: distance3D(arr[i], arr[j])
        });
    }
}

// --- Step 5: Sort pairs by distance ---
distances.sort((p1, p2) => p1.dist - p2.dist);

// --- Step 6: Union-Find (Disjoint Set) ---
class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);

        if (rootA === rootB) return false; // already connected

        if (this.size[rootA] < this.size[rootB]) [rootA, rootB] = [rootB, rootA];

        this.parent[rootB] = rootA;
        this.size[rootA] += this.size[rootB];
        return true; // successful merge
    }
}

// --- PART ONE: Process first NUM_PAIRS closest pairs ---
let dsu1 = new DSU(arr.length);
for (let i = 0; i < NUM_PAIRS && i < distances.length; i++) {
    let pair = distances[i];
    dsu1.union(pair.a, pair.b);
}

// --- Step 7: Group points by cluster for Part One ---
let clusters = {};
for (let i = 0; i < arr.length; i++) {
    let root = dsu1.find(i);
    if (!clusters[root]) clusters[root] = [];
    clusters[root].push(i);
}

// --- Step 8: Get cluster sizes ---
let sizes = Object.values(clusters).map(c => c.length);
sizes.sort((a, b) => b - a); // descending order

console.log("Part One:");
console.log("Cluster sizes (descending):", sizes);

let productTopThree = sizes[0] * sizes[1] * sizes[2];
console.log("Product of top 3 cluster sizes:", productTopThree);

// --- PART TWO: Find last pair to connect all boxes ---
let dsu2 = new DSU(arr.length);
let lastPair = null;

for (let pair of distances) {
    if (dsu2.union(pair.a, pair.b)) {
        lastPair = pair; // this merge joined two clusters
    }

    // check if all boxes are connected
    let roots = new Set();
    for (let i = 0; i < arr.length; i++) {
        roots.add(dsu2.find(i));
    }
    if (roots.size === 1) break; // everything is connected
}

console.log("\nPart Two:");
console.log("Last pair to connect all boxes:", lastPair);

// Multiply the X coordinates of that last pair
let productX = arr[lastPair.a][0] * arr[lastPair.b][0];
console.log("Product of X coordinates of last connected pair:", productX);
