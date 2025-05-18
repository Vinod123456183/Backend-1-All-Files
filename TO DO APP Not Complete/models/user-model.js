const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String, // Ensure this is defined
  listModel: [{ type: mongoose.Schema.Types.ObjectId, ref: "listModel" }],
});

module.exports = mongoose.model("user", userSchema);
