import express from 'express'
import path from 'path'
const port = process.env.PORT || 200;
const app = express();

app.get('/' , function(req,res){


    /* WE caNNOt Do this Operation in node.js  */
    // console.log(__dirname);
    // console.log(__filename);

    /* Instead we do in express.js */
    // console.log(import.meta.url);
    // const FILENAME = new URL(import.meta.url).pathname;
    // console.log(FILENAME);    
    // res.send('Hello World');

  
    // Method 1
    res.send(`html ,,,,   `)


    // STEP 2 -- How to send a file
    // either copy a html css file 
    // OR
    const filePathHtml = path.join(import.meta.dirname , "PUB" , "ind.html")
    // PUB is a folder where all the static files are stored , ind.html is the file we want to send
    res.sendFile(filePathHtml)



})

app.listen(port , function(){
    console.log('Server is running on port ' , port);
})
