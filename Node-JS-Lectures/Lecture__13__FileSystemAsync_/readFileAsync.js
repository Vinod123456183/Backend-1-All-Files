const fs = require('fs')
const path = require('path')

const fileName  = 'async.txt';
const filePath = path.join(__dirname , fileName);

// const readFile = fs.readFile(filePath , 'utf-8' , (e,data)=>{
//     if(e){
//         console.log('Error');
//     }else{
//         console.log(data);
        
//     }
        
// })

// const appendFile = fs.appendFile(filePath,'\n updated text of the file ' , 'utf-8' , (e)=>{
//     if(e) {
//         console.log('Eror');
//     }else{
//         console.log('File Updated Succesfully');
        
//     }
// })


// const deleteFile = fs.unlink(filePath,(e)=>{
//     if(e)console.log("Error");else{
//         console.log('File Deleted Succesfully');
        
//     }
// })
