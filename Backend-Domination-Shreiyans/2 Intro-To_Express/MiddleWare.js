const express = require("express")
const app = express();

app.get("/", (req,res)=>{
    res.send("Main");
})

app.use('/a',(req , res ,next)=>{
    console.log("this is a middleware");
    next();
})

app.listen(3000);