const express = require("express");
const app = express();
const config = require("config");

// kisi bhi req se phle line
require("dotenv").config();
console.log(process.env.EXPRESS_KEYS);

const db = require("./config/mongoose-connection");
const indexRouter = require("./routes/index-router");
const userRouter = require("./routes/user-router");
const path = require("path")



app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jb hi hum / router toh hum index router pr pauch jaenge
app.use("/", indexRouter);
app.use("/user", userRouter);

// we can write khud ka config in config folder default file
app.listen(config.get("PORT"));
// app.listen(process.env.PORT || 3000);
