const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/' , (req , res)=>{
    res.render("index")
})

app.post('/register' , async(req , res)=>{
    let {email , password , username , name , age} = req.body;
    let user = await userModel.findOne({email:email})
    if(user)
        return res.status(500).send("User Already Register");
    bcrypt.genSalt(10 , (err,salt)=>{
        // console.log(salt);
        // bcrypt.hash(req.body.password)
        bcrypt.hash(password , salt , async (err , hash)=>{
            // console.log(hash);
            let user =  await userModel.create({
                username,
                email,
                age,
                name,
                password:hash
            })
            let token = jwt.sign({email:email , userid : user._id} , "secret")
            res.cookie("token", token);
            res.send("Registered");
        })
    })
})

app.get('/login',(req,res)=>{
    res.render("login")
})
app.post('/login' , async(req , res)=>{  
    let {email , password } = req.body;
    let user = await userModel.findOne({email:email})
    if(!user)
        return res.status(500).send("somethinf wrong  why not create account krdo krke nahi likha sir ne ");
  
    bcrypt.compare(password , user.password , (err,result)=>{
        if(result){
            // console.log(result);
            
            let token = jwt.sign({email:email , userid : user._id} , "secret")
            res.cookie("token", token);
            res.status(200).send("You can Login")
        }else
            // res.send("Sorry Wrong Email or Pass" );
            // setTimeout(() =>{
                res.redirect("/login")        
            // },2000)
    })
})

app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect("/")
})

// middleware for protection the routes toh isse profile me lagana login me nahi 
let isLoggedin = (req, res, next) => {
    if (!req.cookies?.token) {
        return res.status(401).send("You must be logged in");
    }

    jwt.verify(req.cookies.token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid or expired token");
        }
        req.user = decoded; // Attach user data to request
        next(); // Move to the next middleware/route handler
    });
};

// because arrow function should defined first then use 
app.get('/profile' , isLoggedin , (req , res)=>{
    // jb hum verify ki hum valid user h toh fir hum req res k paas jaenge 
    // toh fir hume data access krna h ki kon user h 
    console.log(req.user);
    res.send("profile")
})
app.listen(3000);
