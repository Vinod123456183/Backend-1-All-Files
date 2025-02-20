const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/dbs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post", // Reference to the post model
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel }; // Exporting userModel
