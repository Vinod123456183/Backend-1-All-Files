const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel"); // Corrected import
const postModel = require("./models/postModel"); // Corrected import

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/testDDb")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

app.post("/create", async (req, res) => {
  try {
    const createdUser = await userModel.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
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
    // Find the user by username
    let user = await userModel.findOne({ name: req.params.username }); // Changed 'userName' to 'name'

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    let createdPost = await postModel.create({
      title: req.body.title || "Default title", // Added title to create post
      content: req.body.content || "Default content for the post",
      author: user._id,
    });

    // Add the post to the user's posts array
    user.posts.push(createdPost._id);
    await user.save();

    console.log({ user, createdPost });
    res.send({ user, createdPost }); // Send response with user and post data
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error creating post", details: err.message });
  }
});

app.get("/posts", async (req, res) => {
  let posts = await postModel.find().populate("author"); // Corrected field name from 'user' to 'author'
  res.send(posts);
});


app.get("/users", async (req, res) => {
  let users = await userModel.find().populate("posts");
  res.send(users);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
