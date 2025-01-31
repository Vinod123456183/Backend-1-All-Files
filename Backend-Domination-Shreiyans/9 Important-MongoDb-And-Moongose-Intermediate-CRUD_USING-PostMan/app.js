const express = require('express');
const app = express();
const mongooseCollection = require('./config/moongoose');
const userModel = require('./models/user');
const debuglog = require('debug')('development:app');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Main PAge");
})

app.post('/create' , async (req,res)=>{

    let {name , userName , password,email} = req.body;

    let createdUser = await userModel.create({
        name,userName,
        password,
        email,
    })

    res.send(createdUser);
})



app.get('/read' , async (req,res)=>{
    let allUSers = await userModel.find();
    res.send(allUSers);
})

// single user Read
app.get('/read/:username__name' , async (req,res)=>{
    // userName means voh usermodel wala 
    let user = await userModel.findOne({userName:req.params.username__name});
    res.send(user);
})


app.get('/update/:userName' , async (req,res)=>{
    let {name,userName,email}=req.body;
    let user = await userModel.findOneAndUpdate({userName:req.params.userName} , {userName , name , email} , {new:true});
    res.send(user);
})


app.get('/delete/:userName' , async (req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({userName:req.params.userName});
    res.send(deletedUser);
})




app.listen(3000);
