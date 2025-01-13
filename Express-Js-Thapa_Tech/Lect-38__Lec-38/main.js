import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});


app.get('/about', (req, res) => {
    res.send('<h1>About World</h1>');
});

// this is the main information about the server , it should be hided in production 
console.log(process);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

