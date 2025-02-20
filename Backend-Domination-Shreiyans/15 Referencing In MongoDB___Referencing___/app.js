const express = require("express");
const mongoose = require("mongoose");
const { userModel } = require("./models/userModel"); // Correct import
const { postModel } = require("./models/postModel"); // Correct import

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("Main");
});

// Create User
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

// Create Post for a User by their Username
app.post("/:username/create/post", async (req, res) => {
  try {
    // Find the user by username
    let user = await userModel.findOne({ userName: req.params.username });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Create a new post
    let createdPost = await postModel.create({
      content: req.body.content || "Default content for the post",
      user: user._id,
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

// all posts
app.get("/posts", async (req, res) => {
  let Posts = await postModel.find().populate("user");
  res.send(Posts);
});

// all userss
app.get("/users", async (req, res) => {
  let Users = await userModel.find().populate("posts");
  res.send(Users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
