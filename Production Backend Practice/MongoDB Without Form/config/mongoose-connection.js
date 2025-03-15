const mongoose = require("mongoose");
mongoose
  .connect(`${process.env.MONGODB_URI}/______PARESHAN_____`)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;
db.on("error", (e) => {
  console.log("Error Connecting DB");
});
db.on("open", (e) => {
  console.log(" DB Succesfully Connected");
});

module.exports = db;
