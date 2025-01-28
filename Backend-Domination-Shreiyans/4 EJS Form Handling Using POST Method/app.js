const express = require("express")
const ejs = require("ejs");
const app = express();


app.set("view engine", "ejs");

// humne post method se form bja h and data encrypt krke bja h  
// ab use read krna h toh humne y neeche 2 line liki h

// json support
app.use(express.json());
// form support
app.use(express.urlencoded({ extended: true }));




app.get("/", (req, res) => {
    res.render('index');
});




app.post('/ss', (req, res) => {  
    res.send('Data AA Gya Hai');
    console.log(req.body);
  });




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
