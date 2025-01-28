const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

// Middleware
// Use 'dev' format for better visibility
app.use(morgan("combined")); 
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Main");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
