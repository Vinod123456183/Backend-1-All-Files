    // orm , ojm

    const express = require('express');
    const app = express();

    const userModel = require('./usermodel');

    app.get('/', (req, res) => {    
        res.send('Hello World');
    });

    app.get('/create', async (req, res) => {    
        // later done by postman ,
        //  below mongoose is a asynchronous code 
        // first sync code then async code
        // below code ko phle chlane k liye we can use async await
        // jisse phle chalana h use await and in parent function pr async lagana compulsory h
        let createdUser =  await userModel.create({
            name : "xx",
            userName: "xx",
            email:'@gmail.com'
        })
        res.send(createdUser);
        // console.log('sdjskdj');        
    });



    // INTERVIEW WUES
    // Find RETurns a array chae ek hi kyu na ho
    // userModel.find(); ek bhi user nahi hone pr it will return null 
    // , if milega toh array me nahi object me aaega
    //find give array , findone give object 
    // findone gives phla if therer are the duplicates value 


    app.get('/read', async (req, res) => {    
        // find means read , sare user ko dhundega and read krdega
        let users = await  userModel.find();
        res.send(users);    

    });




        // specific read
    // app.get('/read', async (req, res) => {    
    //     // find means read , sare user ko dhundega and read krdega

    //     let users = await  userModel.find({name:'UZUMAKI'});
    //     res.send(users);    

    // });


    app.get('/update', async (req, res) => {    
        // userModel.findOneUpdate(findone , update , {new:true})
        let userUpdate = await userModel.findOneAndUpdate({userName:'uzumaki'} , {name:"UZUMAKI"} , {new:true})
        res.send(userUpdate);    
    });





    app.get('/delete', async (req, res) => {    
        let deletedUSER = await  userModel.findOneAndDelete({userName:'xx'});
        res.send(deletedUSER);
        // delete se phle ek baar darshan so put in variable

    });



    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });


    /**
     id: 611215562a582d4997b5e843
     
    Timestamp (4 bytes): Yeh 4 bytes ka timestamp hota hai jo document ke creation time ko represent karta hai.

    Machine identifier (3 bytes): Yeh 3 bytes ka unique identifier hota hai jo machine ko identify karta hai jis par MongoDB server chal raha hai.

    Process identifier (2 bytes): Yeh 2 bytes ka unique identifier hota hai jo process ko identify karta hai jisne ObjectId generate kiya hai.

    Counter (3 bytes): Yeh 3 bytes ka counter hota hai jo document ko uniquely identify karta hai machine, process, aur timestamp ke combination mein.


    */
