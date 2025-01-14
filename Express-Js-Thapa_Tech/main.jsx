import express from 'express';
import { Port } from './env.js';  //important to use .js
const app = express();


app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About World</h1>');
});


app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
