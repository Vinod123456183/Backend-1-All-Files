const mongoose = require("mongoose");
mongoose
  .connect(`${process.env.MONGODB_URI}/testtesttesttest`)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

let db = mongoose.connection;

db.once("open", () => {
  console.log("DB Conected");
});

// it gives everything jo hum data base se dekh skte h
// like connetcion dekhna , db drop
mongoose.exports = db;
