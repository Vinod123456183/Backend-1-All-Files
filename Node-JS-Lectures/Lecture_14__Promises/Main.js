const fs = require('fs')
const path = require('path')

const Filename = 'Name.txt';
const PathNamr = path.join(__dirname , Filename);

// .then and .catch

// Because we havent create a Name.txt file 
// const File = __dirname
// fs.promises.readdir(File).then((d)=>console.log(d)
// ).catch((e)=>console.log(e)
// )

// const fileName = __dirname;

// fs.promises.readdir(fileName).then((data)=>console.log(data)
// ).catch((e)=>console.log(e)
// )


// For Writing Data
// fs.promises.writeFile(PathNamr,'this is new File creation','utf-8')
// .then((data)=>console.log('data is Writeen succefully')
// ).catch((e)=>console.log(e))

// Either toString or utf8




// fs.promises.appendFile(PathNamr ,'\nupdate' ,'utf-8').then((data)=>console.log(' ->' , data )
// ).catch((e)=>{console.log('Error',e);
// })


// For Reading Data
// fs.promises.readFile(PathNamr , 'utf-8').then((data)=>console.log(' ->' , data )
// ).catch((e)=>{console.log('Error',e);
// })


// For Reading Data
fs.promises.unlink(PathNamr , 'utf-8').then((data)=>console.log(' ->' , data )
).catch((e)=>{console.log('Error',e);
})


// or instread of fs.promises
// const fs = require('fs/promises')

fs.unlink(PathNamr , 'utf-8').then((data)=>console.log(' ->' , data )
).catch((e)=>{console.log('Error',e);
})
  
