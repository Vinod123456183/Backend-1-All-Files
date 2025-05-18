const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const db = require("./config/mongoose-connection");
const indexRouter = require("./routes/index-router");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
    res.locals.session = req.session; // Makes `session` accessible in EJS
    next();
  });
  
app.use("/", indexRouter);

app.listen(process.env.PORT);
