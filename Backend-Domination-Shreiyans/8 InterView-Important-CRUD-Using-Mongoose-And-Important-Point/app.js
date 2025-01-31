// most important about async await anad small small imp thing that can asked in interview

const express = require('express');
const mongooseconnection = require('./config/moongoose')
const userModel = require('./models/user')
const app = express();

// means app side se jo bhi message aaenge voh debug log k through likh skte h
const debuglog = require('debug')('development:app')



app.get('/',(req,res)=>{
    console.log("Hei");
    res.send("Hi")  
})


// Note useModel.create is a asyncronous command

// How to know ki konsa function async h konsa await h 

// agar koi system america se data india me laa raha h 
// aur kuch nahi pta kitni deer me laega
// toh jab tk data na aaye toh tb tk process mt krna so it called as Blocking Code
// means aage process ko rok k rakhega jb tk koi particular kaam not completed
// so 
// jo non depending h voh aage br jaega a


// agar koi chiz kisi pr dependent h toh usse hum async block me likhte h
// so 3 mrthod 
// 1 using function callback = > jb answer aa jae toh hum callback bj skte h 
// 2 Creating Promisies => promise create krke pura asyncronous block bna skte h
// 3 ayync await = >  hum log y promises likh rahe h kab answer aa jaega 
// toh await k through resolve kr denge



// Now

// await = means phle await k andar jo bhi h 
// phle aap y kr lo fir agli line chalana


app.get('/create', async(req,res)=>{
    
    // to galti se neeche console likh diya ki user created toh phle Voh Print hoga
    // tbhi y chlega
    // by chance coh print and user create nahi hua toh dikkhat


    let createdUser = await userModel.create({
        userName:"Vinod",
        name:"Singh",
        email:"Viviv",
        password:"Gand"        
    })

    debuglog("User Created -> ");
    res.send(createdUser);

    // _v means jitne baar bhi update krenge  utni baar version badalta h
    // diff user have diff id
})





// To read one user 

// app.get('/read',async (req,res)=>{
//     let user  = await userModel.findOne({name:"Singh"})
//     debuglog("REaded users");
//     res.send(user);
// })





app.get('/read',async (req,res)=>{
    let users  = await userModel.find()
    // and it will return in array and using foreach
    debuglog("All Users Displayed "); 
    res.send(users);
})




// update
app.get('/update',async (req,res)=>{
    // 3 arguments 
    // find kona update krna h , ky update krna h, callback
    // 

    // note yahan pr error handling krni h username ki jagah name 
    // toh postman relaod hi ho raha tha and localhost link bhi
    let updatedUser = await userModel.findOneAndUpdate(  {userName :"Binod"}  , { userName :"BBBinod"} , { new : true})
    
    // ye update toh kr deta h but y purana wala data return krta h
    // postman and other me same name hi hoga but database me change ho jaega 
    // to avoid we use new : true , it return new value


    console.log(updatedUser);
    res.send(updatedUser)

})




// delete

app.get('/delete' , async(req,res ) => {
    let deleteUser = await userModel.findOneAndDelete({userName : "Vinod"})
    console.log(deleteUser);
    res.send(deleteUser);
})






app.listen(3000);












// $env:DEBUG="development:app"
//  $env:DEBUG='development:mongooseconfig'

// agar database se lena dena  , api , h toh use async await 

