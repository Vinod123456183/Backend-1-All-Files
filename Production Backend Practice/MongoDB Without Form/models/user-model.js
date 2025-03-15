const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
