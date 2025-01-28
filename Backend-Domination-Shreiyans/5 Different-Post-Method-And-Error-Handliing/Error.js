
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
    try {
        res.send(hi);  // 'hi' is not defined, this will cause an error
    } catch (error) {
        next(error);  // Pass error to the error-handling middleware
    }
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.message);  // Log error to console
    res.status(500).send(`Error: ${err.message}`);  // Send proper error message
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
