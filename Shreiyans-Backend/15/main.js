const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const  userModel = require('./models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

app.post('/create', (req, res) => {
    let{username , email , password , age} = req.body; 
    bcrypt.genSalt(10 , (e,salt)=>{
        // console.log(salt);
            bcrypt.hash(password , salt , async (e,hash)=>{
                // console.log(hash);
                let Createduser =  await userModel.create({
                    username,
                    email,
                    password:hash,
                    age
                })
                let token = jwt.sign({email:email} , "secretKey")
                res.cookie(token);
                res.send(Createduser);
            })
        })
        
    

});

app.get('/login' , (req,res)=>{
    res.render('login');
})

app.post('/login' , async (req,res)=>{
    // verify email if user not found it return null
    let user = await userModel.findOne({email:req.body.email})
    // console.log(user.password, req.body.password);
    bcrypt.compare(req.body.password , user.password ,(e,resul)=>{
        console.log(resul);
    })
})

app.get('/log' , (req , res)=>{
    res.cookie("token",""); 
    res.redirect('/');
})







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
