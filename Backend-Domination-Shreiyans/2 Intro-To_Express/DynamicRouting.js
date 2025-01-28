const express = require("express");
const app = express();



app.get("/name/:username/:age", (req, res) => {
    res.send(`requested username: ${req.params.username}` + " age:" + req.params.age);
    // res.send(`requested username: ${req.params.age}`);
});

















// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
