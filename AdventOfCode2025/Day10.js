const fs = require("fs");

/* =========================
   READ & PARSE INPUT
========================= */

function data() {
    const lines = fs.readFileSync("data.txt", "utf8")
        .trim()
        .split("\n");

    let machines = [];

    for (let line of lines) {
        let parts = line.split(" ");

        // target like "[.##.]"
        let target = parts[0];

        // buttons like "(0,2)" "(1,3)" etc
        let buttons = [];

        for (let i = 1; i < parts.length; i++) {
            if (parts[i].startsWith("(")) {
                buttons.push(
                    parts[i]
                        .replace(/[()]/g, "")
                        .split(",")
                        .map(Number)
                );
            }
        }

        machines.push({ target, buttons });
    }

    return machines;
}

/* =========================
   SOLVER
========================= */

let machines = data();
let totalPresses = 0;

for (let k = 0; k < machines.length; k++) {

    /* ---- target to bits ---- */
    let targetBits = machines[k].target
        .slice(1, -1)
        .split("")
        .map(c => c === "#" ? 1 : 0);

    let numLights = targetBits.length;
    let buttons = machines[k].buttons;
    let numButtons = buttons.length;

    let minClicks = Infinity;

    /* ---- try all combinations ---- */
    for (let mask = 0; mask < (1 << numButtons); mask++) {

        let state = Array(numLights).fill(0);
        let presses = 0;

        for (let i = 0; i < numButtons; i++) {
            if ((mask >> i) & 1) {
                presses++;

                for (let light of buttons[i]) {
                    state[light] ^= 1; // toggle
                }
            }
        }

        /* ---- compare with target ---- */
        let matches = true;
        for (let i = 0; i < numLights; i++) {
            if (state[i] !== targetBits[i]) {
                matches = false;
                break;
            }
        }

        if (matches) {
            minClicks = Math.min(minClicks, presses);
        }
    }

    totalPresses += minClicks;
}

console.log("Fewest total button presses:", totalPresses);
