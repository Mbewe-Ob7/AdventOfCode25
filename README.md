# AdventOfCode25
## Day 1

The puzzle asks you to process a sequence of “rotations” (one per line) that describe how to open a safe. 
Advent of Code


Part 1 is relatively straightforward: a “soft landing” to start the year. 

Once you solve Part 1, Part 2 unlocks — typically introducing a twist that demands more careful logic or edge-cases. That’s standard for AoC puzzles. 


## Day 2 — “Gift Shop”

The setting: you are asked to help clean up a gift shop database: among many product ID ranges (your input), you must identify which product IDs are invalid. 

### Part 1:
Find invalid IDs under a certain rule. Many people solve this with range checking or string-manipulation. 

### Part 2:
The invalidity condition gets a bit more complex — often requiring more careful pattern detection (for instance, checking for repeated patterns in IDs). 


## Day 3 — “Lobby”

Story: you descend into a vast lobby, but encounter a security checkpoint and a problem to solve to proceed. 


The core challenge: Your input lines represent “banks” (or sequences) of digits. For each line you must pick out digits to form a “largest number” under certain constraints. For example: in Part 1
you might pick 2 digits; in Part 2, maybe 12 digits, optimizing to maximize the resulting number. 



Typical solution: a “greedy” approach — for each digit in the resulting number, pick the maximum possible digit from the earliest possible position that still leaves enough digits remaining to complete the rest. 


## Day 4

Scenario: There are rolls of paper (@) arranged on a 2D grid (your input is the map). The Elves need to optimize forklift access by identifying which rolls are “accessible” — i.e. rolls that have fewer than four neighboring rolls in the 8 adjacent cells. 


Your task: parse the grid, check the neighbor-counts for each paper roll, and count how many rolls satisfy the “accessible” condition. 


Output: The number of accessible rolls (based on your input).
