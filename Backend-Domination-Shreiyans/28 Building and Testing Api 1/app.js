const express = require("express");
const app = express();
const PORT = 3000;
const indexRouter = require("./routes/indexRouter");
const apiRouter = require("./routes/apiRouter");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(PORT);
