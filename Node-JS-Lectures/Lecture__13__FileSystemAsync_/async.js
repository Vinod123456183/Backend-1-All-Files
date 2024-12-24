const fs = require('fs')
const path = require('path')

const fileName  = 'async.txt';
const filePath = path.join(__dirname , fileName);

// callback function
const writeFile = fs.writeFile(filePath , 'content to write inside' , 'utf-8' , (e)=>{
     if(e){
        console.log("here getting error",e);
    }else {
        console.log('File Saved');
    }
        
});
