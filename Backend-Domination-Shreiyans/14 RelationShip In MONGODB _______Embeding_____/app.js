const express = require("express");
const mongoose = require("mongoose");
const { userModel } = require("./models/userModel");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main");
});


app.post("/create", async (req, res) => {
  try {
    const createdUser = await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    res.send(createdUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error creating user", details: err.message });
  }
});



app.post("/:username/create/post", async (req, res) => {
  try {
    const user = await userModel.findOne({ userName: req.params.username });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    user.posts.push({ content: req.body.content || "Hey, First Post 4 -" });

    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error creating post", details: err.message });
  }
});





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
