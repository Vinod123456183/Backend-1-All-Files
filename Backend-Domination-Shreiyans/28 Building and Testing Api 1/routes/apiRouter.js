const express = require("express");
const router = express.Router();

// const data = require("../data");
// 2
const userModel = require("../model/userModel");

// router.get("/", (req, res) => {
//   res.json(data);
// });

router.post("/create", async (req, res) => {
  const user = await userModel.create({
    name: req.body.name,
    userName: req.body.userName,
  });
  // res.json(user);
  // OR
  if (!user) {
    res.send("User Is not Created");
  }
  res.json({ success: true, message: "User Created Success!" });
});

module.exports = router;
