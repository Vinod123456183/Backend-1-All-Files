const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.get("/", (req, res) => {
  res.send("He");
});

app.post("/encrypt", async (req, res) => {
  let salt = await bcrypt.genSalt(10); // 10 round , folds
  // res.send(salt);

  let encrypt = await bcrypt.hash("loveyou", salt); // plain password
  res.send(encrypt);
});

app.post("/match-password", async (req, res) => {
  let checkPassword = await bcrypt.compare(
    "loveyou",
    "$2b$10$LsNNz8DJSeBoixIpC4MqM.KBrS2iuLlqr4KbN9qm1uk4u6FFZ.6iq"
  );
  res.send(checkPassword);
});

app.listen(3000);
