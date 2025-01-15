// Cookie help in mainting the session of the user and server

// if we send any data so a string is also send by server and while sendig 
// or recieving the cookie help to talk 
// and the connection is created called a session so 
// if we want to make or complete a session then the cookie help to talk or maintiant the session


// to break a connection we have to delete the cookie
// we use cookie to logged a person in that site


import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {    
    res.send('Hello World');
} )  

app.get('/about', (req, res) => {    
    res.send('IN About Page');
} )  

app.listen(5000, () => {
    console.log('Server is running at port 5000');
})


// in a login page if we are loginhni in a system then in the form of the blob the data is tranfered

// blob is a binary large object and it is used to store the data in the form of the binary containt info 
// like ip address, mac address, data , location it is like a Gola , not readable by human

// so blob dont directly convert data into the binary
//  form it first convert the data into the string and then into the binary form
// by using 
// for binary conversion
// app.use(express.json()); 
// 
// app.use(express.urlencoded({extended: true}));

