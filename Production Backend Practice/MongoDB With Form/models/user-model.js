const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  phone: Number,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
