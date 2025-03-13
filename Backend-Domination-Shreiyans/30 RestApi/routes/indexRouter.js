const express = require("express");
const router = express.Router();

// const data = require("../data");
// 2
const userModel = require("../model/userModel");

// router.get("/", (req, res) => {
//   res.render("index", { data });
// });

router.post("/create", async (req, res) => {
  const user = await userModel.create({
    name: req.body.name,
    userName: req.body.userName,
  });
  res.send("User Created Successfully");
});

module.exports = router;
