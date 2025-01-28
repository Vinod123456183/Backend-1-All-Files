
const express = require("express")
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.get("/", (req,res)=>{
    res.send("Main");
})


// cookie set iss route pe hui h toh hume /a pe jake dekhna hoga
// fir uske baad hum kisi bhi route pr chle jaye toh cookie set ho jayegi
app.get('/a',(req , res ,next)=>{
    res.cookie("Token" , "12345");
    res.send("Cookie Set go gyi bhai");
})


// ab browser se kuch aa raha h toh usse hum ek show route pr dikhate h
app.get('/show',(req , res ,next)=>{
    res.send(req.cookies.Token);
})



app.listen(3000);
