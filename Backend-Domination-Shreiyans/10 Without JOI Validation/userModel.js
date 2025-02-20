form  from frontend  ---->      JOI   ------>  Foreward 





Without JOI
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/joitestdb");

const userSchema = mongoose.Schema({
  userName: String,
  name: String,
  age: Number,
  contact: Number,
  email: String,
});
module.exports = mongoose.model("User", userSchema);

