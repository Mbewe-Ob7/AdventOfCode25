let fs = require('fs');

function data(){
     return fs.readFileSync('data.txt','utf-8').split('\n').map(x => x.split(' ').map(Number)); 
}

let arr = data();
function isSafe(arr) {
    let direction = null; // "up" or "down"

    for (let i = 1; i < arr.length; i++) {
        let diff = arr[i] - arr[i - 1];

        // no change is invalid
        if (diff === 0) return false;

        // step too big
        if (Math.abs(diff) > 3) return false;

        // determine direction
        if (direction === null) {
            direction = diff > 0 ? "up" : "down";
        } else {
            // direction changed
            if (
                (direction === "up" && diff < 0) ||
                (direction === "down" && diff > 0)
            ) {
                return false;
            }
        }
    }

    return true;
}

let count = 0;
for(let row = 0; row < arr.length; row++){
    let valueArr = arr[row];
    if(!isSafe(valueArr)){
        for(let col = 0; col < arr[row].length; col++){
            const test = valueArr
                .slice(0, col)
                .concat(valueArr.slice(col + 1));

            if(isSafe(test)){
                count++;
                break;   
            }
        }
    }else count ++    
}

console.log(count);

