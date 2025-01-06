
// to run server node --watch filename.js
const http = require('http')


// server kya h ye == event emmitter
// Function call or triggering 
// server.emit

const server = http.createServer((req , res)=>{
    if(req.url === '/'){
        res.setHeader('Content-Type' , 'text/html');
        res.write('<h1> Welcome    Home Page Button </h1>');
        res.end();
    }
    if(req.url === '/server'){
        res.write('Server Page ');
        res.end();
    }123
    if(req.url === '/contact'){
        res.setHeader('Content-Type' , 'text/plain');
        res.write('Contact Pa ');
        res.end();
    }
});

const PORT = 3000;
server.listen(PORT , ()=>{
    console.log(`Server is Running at ${PORT} Port Number`);
})
