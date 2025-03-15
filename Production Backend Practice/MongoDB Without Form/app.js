const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./config/mongoose-connection");
const indexRouter = require("./routes/index-router");

app.use("/", indexRouter);

app.listen(process.env.PORT);
