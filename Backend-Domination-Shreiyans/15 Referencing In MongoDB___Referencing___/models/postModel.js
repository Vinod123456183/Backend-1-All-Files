const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("post", postSchema);
module.exports = { postModel }; 
