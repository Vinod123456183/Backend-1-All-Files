const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  createdAt: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Added posts array to user schema
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
