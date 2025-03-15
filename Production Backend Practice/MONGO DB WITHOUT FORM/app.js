const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

const db = require("./config/mongodb-connection");
const indexRouter = require("./routes/index.router");

app.use("/", indexRouter);

app.listen(process.env.PORT);
