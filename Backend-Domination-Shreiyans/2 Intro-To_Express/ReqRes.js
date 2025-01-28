const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send(req.headers);
    console.log(req.ip);
    
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
