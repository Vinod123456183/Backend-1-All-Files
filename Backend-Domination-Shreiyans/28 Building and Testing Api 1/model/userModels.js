const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ApiDev");

const userSchema = mongoose.Schema({ name: String, userName: String });

module.exports = mongoose.model("user", userSchema);
