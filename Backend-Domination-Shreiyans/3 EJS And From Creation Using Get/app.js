const express = require("express")
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render('index');
});


app.get('/ss', (req, res) => {  
    res.send('Data AA Gya Hai'); // ussi ss route pr and screen pr y aaega and urll me given info
    console.log(req.query);
    
  });


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
