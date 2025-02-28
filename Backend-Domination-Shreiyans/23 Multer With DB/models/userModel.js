// userModel.js
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MulterDbTest");
const userModel = mongoose.Schema({
  name: String,
  userName: String,
  image: Buffer,
});

module.exports = mongoose.model("user", userModel);
