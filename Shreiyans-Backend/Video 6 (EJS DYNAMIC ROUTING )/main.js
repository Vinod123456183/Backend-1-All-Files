
// 1 --  Setting up Body parsers

// 3 == Setting Up Public static Files like html , css , js
// __dirname means dir name tk , public means public folder


// app.get('/' , (req,res)=>{
//     res.send('Working at Some Port');
// })
  

// Frontend ka means ejs hota hai
// EJS Html jaisa diktha hai but we can do calculations in it
// Install EJS
// 2 ==  setup ejs as a view engine

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();



// 1 -- Setting up Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// 3 -- Setting Up Public static Files like html, css, js
// and while linking css then dont use public in the path because we defined here 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index.ejs');
});



// Start the server
app.listen(100, () => {
    console.log('Server is running at http://localhost:3000');
});




// DYNAMIC ROUTing
// /author/:name
// /author/:name1
// /author/:name2

// To make it dynamic realsize konsa part dynamic hai and add :

// frontend se backend pr bja user name 
app.get('/author/:userName', (req, res) => {    // name is dynamic
    // res.send('author.ejs', { name: req.params.name });
    // req.params k aage jo kuch bhi h
    res.send(` Welcome ${req.params.userName}`);
});


app.get('/prof/:userName/:age', (req, res) => {    // name is dynamic
    // res.send('author.ejs', { name: req.params.name });
    // req.params k aage jo kuch bhi h
    // res.send(` Welcome ${req.params.userName} , age is ${req.params.age}`);

    res.send(req.params)
});
