const fs = require("fs");
const path = require("path");

const fileName = "filaname.txt";
const filePath = path.join(__dirname, fileName);



// To Write in file
// const WriteFile = fs.writeFileSync(
//   filePath,
//   "This Is The content ud ",
//   "utf-8"
// );
// console.log(WriteFile);



// To Delete in file
// const deleteFile = fs.unlinkSync(filePath);
// console.log(deleteFile);



// Update name of the file

const newFileName = "newTextFileName.txt";
const newFilePath = path.join(__dirname, newFileName);

const changeName = fs.renameSync(filePath, newFilePath);
console.log(newFileName);
