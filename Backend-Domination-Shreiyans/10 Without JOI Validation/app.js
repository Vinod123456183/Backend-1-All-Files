
const express = require("express");
const app = express();
const userModel = require("./models/userModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main");
});

// Agar Hum Sirf name hi denge toh fir bhi data create ho jaega
app.post("/create", async (req, res) => {
  let user = await userModel.create({
    name: req.body.name,
  });
  console.log(user);
});

app.listen(3000);










with joi
check all in frontend
next handled by joi
mongoose
then store in mongodb
