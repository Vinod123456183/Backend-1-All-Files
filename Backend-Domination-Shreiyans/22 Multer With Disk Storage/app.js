const express = require("express");
const userModel = require("./models/userModel");
const app = express();
const upload = require("./multer");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  //post route me pura data aa jata h req.body me se
  // console.log(req.file);
  let file = await userModel.create({
    name: req.body.name,
    image: req.file.filename,
  });
  res.send(file);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
