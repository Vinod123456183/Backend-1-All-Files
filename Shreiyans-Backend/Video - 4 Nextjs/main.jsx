// Framework Give us the Flow 
// hume ussi flow ko follow karna padta hai

// bath > brush > breakfast > office > lunch > office > dinner > sleep 
// bath kaise bhi karlo chahe 1 ghante me karlo ya 2 ghante me karlo ya balti se nahao ya shower se nahao 

// Express js Framework is a npm package
// react jo banana h bnao it gives tools 


// manages everytinh from recieving the request to sending the response
// youtube.com/iske baad ka part ko Route khte h
// app.get(Routee,Request Handler and ReqHandler is A middleWare)
// FaceBook    >  MiddleWare   >   Routes     >  Response

// MiddleWare lgta h Routrs se phle agar hme kuch chizz krwani h ya perform karwana h  req se phle 
// toh hum use krte h middleware 


import express from 'express';
const app = express();
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use((req,res,next)=>{
    console.log('I am a middleware');
    next();
});

app.use((req,res,next)=>{
    console.log('I am a middleware 2');
    next();
}); 

app.use((req,res,next)=>{
    console.log('I am a middleware 3');
    next();
}); 


app.get('/about',(req,res,next)=>{
    res.send('about Page');
    // Error Handler Jisse code rukta nahi hai
    // This is a common practice during development to test if your error-handling middleware works as expected.
    return next(new Error('Something went wrong'));
});


app.use(function(err , req , res , next){
    console.error(err.stack);
    res.status(500).send('Something Broke Error  Comes In Frontend Side');
})

app.listen(3000,()=>{
    console.log('Server is Running');
})
