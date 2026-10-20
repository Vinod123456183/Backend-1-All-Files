import mongoose from "mongoose";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
