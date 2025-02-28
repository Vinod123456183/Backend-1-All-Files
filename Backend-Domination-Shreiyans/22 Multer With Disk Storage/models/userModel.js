const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MulterDbTest");
const userModel = mongoose.Schema({
  name: String,
  userName: String,
  image: String,
});
mongoose.model("user", userModel);

module.exports = mongoose.model("user" , userModel);
