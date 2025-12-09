function dataReadArr(){
    const fs = require('fs');
    const rotations = fs.readFileSync("data.txt", "utf8").trim().split(",");
    return rotations;
}

function isValid(arr) {
    if (arr.length === 0 || arr.length === 1) return false; 
    const first = arr[0]; 
    
    for (let k of arr) {
        if (k !== first) {
            return false; 
        }
    }
    return true; 
}

//Testing values
console.log(isValid([12,12,12,12]))
console.log(isValid([31,31,32]))


function perNum(num){
    let isPattern = false;
    let str = num.toString();
    let strLen = str.length;

    for (let k = 1; k <= strLen; k++) {
        let arr = [];
        if(strLen % k == 0){
            for (let i = 0; i < strLen; i += k) {
                arr.push(str.slice(i, i + k));
            }
        } else continue;
        if (isValid(arr)) {
            console.log(arr);
            return true   
        }
    }
    return false
}

let count = 0;

for(let line of dataReadArr()){
    const num = line.split("-");
    let start = parseInt(num[0]);
    let end = parseInt(num[1]);

    for(let k = start; k <= end; k++){
        if(perNum(k) === true){
            count += parseInt(k);    
        }
    }
}

console.log("Final Number: " + count);

