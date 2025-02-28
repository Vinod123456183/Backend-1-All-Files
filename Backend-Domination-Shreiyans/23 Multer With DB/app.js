// app.js
const express = require("express");
const userModel = require("./models/userModel");
const upload = require("./multer");
const app = express();
const sharp = require("sharp");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.send("File Not Found");
  let newBuffer = req.file.buffer;
  try {
    // Fix: checking req.file.size instead of req.buffer.size
    if (req.file.size > 2 * 1024 * 1024) {
      // max size is 2MB
      newBuffer = await sharp(req.file.buffer)
        .resize({ width: 1000 })
        .toBuffer();
    }

    console.log(`Old Size ${req.file.size / 1024}`);
    console.log(`New Size ${Buffer.byteLength(newBuffer) / 1024}KB`);

    // Fix: use newBuffer, not NewBuffer
    let file = await userModel.create({
      name: req.body.name,
      image: newBuffer, // use 'newBuffer' instead of 'NewBuffer'
    });
    res.send("File Uploaded to DB");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error uploading file");
  }
});

app.get("/showFiles", async (req, res) => {
  try {
    let files = await userModel.find({});
    res.render("show", { files: files });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching files from the database.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
