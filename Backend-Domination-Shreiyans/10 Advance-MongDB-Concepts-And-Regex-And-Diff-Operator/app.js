const express = require('express');
const app = express();
const userModel = require('./models/user');
const debuglog = require('debug')('development:app');

const dummyData = [
    { userName: 'john_doe', name: 'John Doe', age: '28', password: 'password123', isMarried: false, email: 'john.doe@example.com' },
    { userName: 'jane_smith', name: 'Jane Smith', age: '34', password: 'securePassword', isMarried: true, email: 'jane.smith@example.com' },
    { userName: 'mark_johnson', name: 'Mark Johnson', age: '45', password: 'markpass', isMarried: true, email: 'mark.johnson@example.com' },
    { userName: 'emily_davis', name: 'Emily Davis', age: '23', password: 'emilyPass!', isMarried: false, email: 'emily.davis@example.com' },
    { userName: 'mike_brown', name: 'Michael Brown', age: '37', password: 'mike123', isMarried: false, email: 'michael.brown@example.com' },
    { userName: 'lucas_white', name: 'Lucas White', age: '31', password: 'lucas789', isMarried: false, email: 'lucas.white@example.com' },
    { userName: 'olivia_james', name: 'Olivia James', age: '29', password: 'olivia456', isMarried: true, email: 'olivia.james@example.com' },
    { userName: 'sophia_clark', name: 'Sophia Clark', age: '40', password: 'sophia123', isMarried: true, email: 'sophia.clark@example.com' },
    { userName: 'noah_martin', name: 'Noah Martin', age: '26', password: 'noah321', isMarried: false, email: 'noah.martin@example.com' },
    { userName: 'mia_taylor', name: 'Mia Taylor', age: '22', password: 'mia!567', isMarried: false, email: 'mia.taylor@example.com' },
    { userName: 'william_anderson', name: 'William Anderson', age: '39', password: 'william89', isMarried: true, email: 'william.anderson@example.com' },
    { userName: 'ella_lee', name: 'Ella Lee', age: '33', password: 'ella2025', isMarried: true, email: 'ella.lee@example.com' },
    { userName: 'jacob_harris', name: 'Jacob Harris', age: '30', password: 'jacob!234', isMarried: false, email: 'jacob.harris@example.com' },
    { userName: 'ava_moore', name: 'Ava Moore', age: '25', password: 'ava1234', isMarried: false, email: 'ava.moore@example.com' },
    { userName: 'benjamin_wilson', name: 'Benjamin Wilson', age: '41', password: 'benjamin89', isMarried: true, email: 'benjamin.wilson@example.com' }
  ];
  

app.get('/',(req,res)=>{
    res.send("Main PAge");
})


// InsertMany Command
app.get('/createmany', async (req,res)=>{
    // we paas array jo ki hume save krna chate h
    let data = await userModel.insertMany(dummyData);
    res.send(data);
})




// muje samaj nahi aaya how it reads dummyData
// without equal operator

// app.get('/getmany', async (req, res) => {
//     let filteredData = await userModel.find({ age: 25 });
//     res.send(filteredData);
//   });


//  dollar means we are using mongoose operator
//  with equal operator 
app.get('/getmany', async (req, res) => {
    let filteredData = await userModel.find({ age:{$eq:30} });
    res.send(filteredData);
});
  



// Not eql operato
app.get('/neoperator', async (req, res) => {
    let filteredData = await userModel.find({ age:{$ne:30} });
    res.send(filteredData);
});



// less than operator
app.get('/lt', async (req, res) => {
    let filteredData = await userModel.find({ age:{$lt:35} });
    res.send(filteredData);
});


// less than or equal operator
app.get('/lte', async (req, res) => {
    let filteredData = await userModel.find({ age:{$lte:30} });
    res.send(filteredData);
});


// greater than operator
app.get('/gt', async (req, res) => {
    let filteredData = await userModel.find({ age:{$gt:35} });
    res.send(filteredData);
});


// less than or equal operator
app.get('/gte', async (req, res) => {
    let filteredData = await userModel.find({ age:{$gte:30} });
    res.send(filteredData);
});



// age ya toh 30 ya 40 ya 50 
app.get('/in', async (req, res) => {
    let filteredData = await userModel.find({ age:{$in:[30 , 40 , 50]} });
    res.send(filteredData);
});



app.get('/nin', async (req, res) => {
    let filteredData = await userModel.find({ isMarried:{$nin:[false]} });
    res.send(filteredData);
});





// exists
// maan lete h agar we made 5000 docouments in db{} so ab 5000 k baad ek extra field dalni h
// ab hume find krne h jsike paas isAdmin field nahi h  

// where to use 

// jb bhi hum field k basis pr search krna chate h 
// ki y field jitno k paas nahi h woh lao jisse add kr paae 

app.get('/exists', async (req, res) => {
    // agar koi nahi hoga toh error bhi shw ho skta h
    let filteredData = await userModel.find({ isAdmin:{$exists : true} });
    res.send(filteredData);
});



// And or operato 
app.get('/and', async (req, res) => {
    let filteredData = await userModel.find({$and:[{isMarried:false} ,  {age:{$gte:20}}]});
    res.send(filteredData);
});



//  or operato 
app.get('/or', async (req, res) => {
    let filteredData = await userModel.find({$or:[{isMarried:false} ,  {age:{$gte:20}}]});
    res.send(filteredData);
});










// Regex
// satrt a se end on se and case insensitive /i
app.get('/regex', async (req, res) => {
    let filteredData = await userModel.find({name:{$regex: /^a.*on/i }});
    res.send(filteredData);
});



// satrt end on se and case insensitive /i
app.get('/regex2', async (req, res) => {
    let filteredData = await userModel.find({name:{$regex: /.*on/i }});
    res.send(filteredData);
});


// gpt 
// i m using regex name start with a and end with w do it



app.listen(3000);
