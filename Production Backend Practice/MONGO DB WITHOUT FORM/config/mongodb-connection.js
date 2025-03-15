const mongoose = require("mongoose");
const debuglog = require("debug")("development:mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const db = mongoose.connection;

db.on("error", (error) => {
  debuglog("Error Connecting DB");
});

db.on("open", () => {
  debuglog("Connected To DB");
});

module.exports = db;
