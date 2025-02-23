const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




app.get("/", (req, res) => {
  res.send("He");
});




app.get("/token-maker", (req, res) => {
  // sign token bna kr deta h
  //secretkey ko ese nahi likhte h wrna sbke acc hack ho skte h
  let token = jwt.sign({ name: "Harsh" }, "secretKey");
  // isme 3 chize save h
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  // eyJuYW1lIjoiSGFyc2giLCJpYXQiOjE3NDAzNDE2Mzl9.
  // qItvdZ2QVpiPDWWJfyZkAatQaUsbPmfg9eeL6y6qL6E

  // so iss token me hamara data save h jajise abhi sirf name store kiya h
  res.send(token);

  // so hum token bnate h
  // hum chae toh save kr skte h aur
  // jb bhi koi req aaege toh token recieve hoga in backend toh hum data nikal lenge
});





app.get("/data-fetch", (req, res) => {
  try {
    // Decode the token (no need for the secret key here)
    let data = jwt.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFyc2giLCJpYXQiOjE3NDAzNDE2Mzl9.qItvdZ2QVpiPDWWJfyZkAatQaUsbPmfg9eeL6y6qL6E"
    );

    // If decoding fails and returns null or undefined, handle the case
    if (!data) {
      return res.status(400).send("Invalid token or decoding failed");
    }
    // Send the decoded data
    res.send(data);
  } catch (err) {
    // Log the error to the console to see what went wrong
    console.error("Error while decoding token:", err);

    // Send an appropriate error response
    res.status(500).send("Something went wrong while decoding the token");
  }
});




app.listen(3000);
