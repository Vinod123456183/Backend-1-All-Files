// GET - server se kuch lana
// kuch keh dena server ko ki esa kr do ya wo kr do

// post - server pr kuch change hoga , is aspect me ki change hoga
// ek matki rkh le , kuch change hua 

// put -update and  pura replace kr deta h,
// aajse name harshit 

// patch - update and  pura replace nahi krta  h, y sirf wahi jo change hona h
// like name change toh name hi change hoga


const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

const data = [1,2,3,4];

app.get('/data',(req,res)=>{
    res.send(data);
})

app.post('/data/:number' , (req,res)=>{
    // res.send("route Working")
    // console.log(typeof req.params.number)
    const value = parseInt(req.params.number);
    data.push(value);
    res.send(data);
})

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});



// Collection in Postman
// workspace means Amazon
    // Collection means sales ,  ussi k andar sare sales url test 
    // Collection means orders , ussi k andar sare order url test 
    

// Current value is used in postman na ki innitial value
// initial value me secret key blank chor skte  h

// agar key testing krni h toh current value me likho na ki initial value me
// to avoid data shairing 
// toh ab koi bhi data shair nahi hoga while shairing postman data 





// file system based project
// company give task , file based app , all data will file based , 
// task in mini chunks 
// can we do chunks me chije and after can we combine all chunks to make a project




// khatabook project 
// 1.  har roj ek file create kr skte h , uss file ka naam date hoga
// 2. /route pr dekh skte h ki saare din ka hisaab  
// 3. click krne pr uss din ka hisaab dekh skte h
// 4. We can either edit , delete and save again .
// 5. We can add new entry also
// 6. We can see total amount of all days
// 7. We can see total amount of any particular day
// 8. We can see total amount of any particular month
// 9. We can see total amount of any particular year
// 10. We can see total amount of any particular perso
// 11. password funcanolity
