const index = "./index.txt";
const fs = require("fs");

// const readFile = fs.readFileSync(index, "utf-8");
// console.log(readFile);


const appendData = fs.appendFileSync('./index.txt' , '\nAppendeded Data' );
console.log(appendData);

      
