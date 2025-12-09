const fs = require('fs');

function dataReadArr() {
    return fs.readFileSync("data.txt", "utf8").trim().split("\n");
}

let arr = [];
let symbols = [];

for(let lines of dataReadArr()){
    if(lines.indexOf("+") <= -1){
        arr.push(lines.trim().split(" ").filter(x => x !== ''))
    }else{
        symbols.push(lines.trim().split(" ").filter(x => x !== ''));
    }
}

let grandTotal = 0;
for(let col = 0; col < arr[0].length; col++){
    let total = 0, mult = 1;
    for(let row = 0; row < arr.length; row++){
        if(symbols[0][col] == '+'){
            total += parseInt(arr[row][col]);
        }else{
            mult *= parseInt(arr[row][col]);
        }   
    }
    total > 0 ? grandTotal += total : grandTotal += mult; 
}
console.log(grandTotal);




