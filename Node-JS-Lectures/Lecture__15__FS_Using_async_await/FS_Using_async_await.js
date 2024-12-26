const path = require('path');
const fs = require('fs');

const fileNmae = 'name.txt';
const pathName = path.join( __dirname , fileNmae);


// const F = __dirname
// fs.promises.readdir(F).then((d)=>console.log(d)
// ).catch((e)=>console.log(e)
// )

// Either use Upper or use Down

// Asynnc await using functions
// when we use async then we have to wait  


// const readFolder = async ()=>{
//     try {
//         const res =  await fs.promises.readdir(F)
//         console.log("Answer is ",res);
        
//     } catch (error) {
//         console.log("error",error);
//     }
// }
// readFolder();



// const writeFile = async () =>{
//     try {
//         const res = await fs.promises.writeFile(pathName , 'Inside File' , 'utf-8')
//         console.log('File Create succesulff',res);
        
//     } catch (error) {
//         console.log('ERrr',error);
//     }
// }

// writeFile();



// const ReadFileFunction = async()=>{
//     try {
//         const res= await fs.promises.readFile(pathName , 'utf-8');
//         console.log('REad Filed is -> ' ,res);
        
//     } catch (error) {
//         console.log('File REad Failed' ,error);
        
//     }
// }
// ReadFileFunction();


// const DeletFile =async ()=>{
//     try {
//         const res = await fs.promises.unlink(pathName,'utf-8')
//         console.log('File DEleted ',res);
        
//     } catch (error) {
//         console.log('delete filed' , error);
        
//     }
// }
// DeletFile()
