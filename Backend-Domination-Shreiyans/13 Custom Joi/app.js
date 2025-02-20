const express = require("express");
const app = express();
const { userModel, validateModel } = require("./models/userModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main");
});

// Agar Hum Sirf name hi denge toh fir bhi data create ho jaega
app.post("/create", async (req, res) => {
  let { userName, name, email, age, contact } = req.body;
  let error = validateModel({ userName, name, age, email, contact });

  // agar return nahi lagaaya toh dono response jaane ka try kr rahe h
  if (error) return res.status(500).send(error.message);
  res.send("Everything Worked");
});

app.listen(3000);
