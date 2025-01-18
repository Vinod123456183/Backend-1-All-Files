// 1 ----------->

// const cookieParser = require('cookie-parser');
// const express = require('express')
// const app = express();

// app.use(cookieParser())

// app.get('/' , (req , res)=>{
//     res.cookie('name','harsh');
//     res.send('Done');
// })


// app.get('/read' , (req , res)=>{
//     // read krne k liye reques use hota h 
//     // set krne k liye response use hota h
//     // res.send(req.cookies);
//     console.log(req.cookies);
//     res.send('Read Page and Cookie will Still there and cookie chipak k jaegi');
// })

// app.listen(3000);




// 2 - >  

// const express = require('express');
// const bcrypt = require('bcrypt');
// const app = express();

// app.get('/' , (req , res)=>{
//     // bcrypt.genSalt(saltRounds , (e , salt)=>{
//     //     bcrypt.hash(myPlaintextPassword , salt , (e,hash)=>{
//     //         // 
//     //     });
//     // });


//     // Encrypt
//     // salt is random string 
//     // after hash pasword ko long string me conert kr diya jata h
//     bcrypt.genSalt(10 , (e , salt)=>{
//         bcrypt.hash("mypassword" , salt , (e,hash)=>{
//             // log salt , hash
//             // console.log(salt);
//             // console.log(hash);
//         });
//     });
//     res.send('Done');
// })
// app.listen(3000);





// const express = require('express');
// const bcrypt = require('bcrypt');
// const app = express();

// app.get('/' , (req , res)=>{
//     // Dcrypt
//     // bcrypt.genSalt(10 , (e , salt)=>{
//     //     bcrypt.compare(myPlaintextPassword , hash , ()=>{

//     //     })
//     // });

//     bcrypt.genSalt(10 , (e , salt)=>{
//         bcrypt.compare("mypassword", "$2b$10$340K8TUzww1awY00hjW35u1/nlDvGi3iOM/AvrMiwJ1nfadojYOkO" , (e , result)=>{
//             console.log(result);
//         })
//     });

//     res.send('Done');
// })
// app.listen(3000);

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    // toh uss secret se hum kisi ka bhi data enc and decrypt kr skte h
    // on basis on secret emial convert in long string 
    let token = jwt.sign({ email: 'ff@' }, "secret");
    // console.log(token);
    res.cookie('token', token, { httpOnly: true }); // hum token bjte h and token me sb data h
    res.send('Done');
});
// ab hum token me sb data h prove krte h
app.get('/read', (req, res) => {
    try {
        // device ne server ko token bj diya h
        if (!req.cookies.token) {
            return res.status(401).send("No token found");
        }
        // console.log(req.cookies.token);
        // token ka data
        let data = jwt.verify(req.cookies.token, "secret");
        console.log(data);

        res.send('Read Page and Cookie will Still there and cookie chipak k jaegi');
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
});

app.listen(3000);
