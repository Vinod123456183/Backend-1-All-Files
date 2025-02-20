const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/testingdbreferencing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

const postSchema = mongoose.Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  posts: [postSchema], 
});

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
