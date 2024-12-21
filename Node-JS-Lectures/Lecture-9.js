// different path in node

const path = require('path')

console.log(__dirname)
console.log('\n');
console.log(__filename)
console.log('\n');


const file_Path_For_Differnt_OS = path.join("FolderName" , "FileName" , "fileName.txt");
console.log((file_Path_For_Differnt_OS));


const parseData = path.parse(file_Path_For_Differnt_OS);
const resolvePath = path.resolve(file_Path_For_Differnt_OS);
const extName = path.extname(file_Path_For_Differnt_OS);

console.log({parseData   , resolvePath , extName});
