const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");

const users = [
  { id: "1", name: "Vinod" },
  { id: "2", name: "Singh" },
];

router.get("/users", (req, res) => {
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  let found = users.find((element) => element.id === req.params.id);
  if (!found) res.json({ success: false, message: "user found failed" });
  // res.json({ success: true, message: "User Founded Success" });
  // or
  res.json(found);
});

router.post("/users/create", (req, res) => {
  let index = Math.floor(Math.random() * 10);
  users.push({ id: index, name: req.body.name });
  res.json(users);
});

module.exports = router;
