const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");

router.get("/users", async (req, res) => {
  let users = await userModel.find();
  res.json(users);
});

router.post("/users", async (req, res) => {
  let users = await userModel.create({
    name: req.body.name,
    userName: req.body.userName,
  });
  res.json(users);
});

router.put("/users/:id", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      name: req.body.name,
    },
    { new: true }
  );
  res.json(updatedUser);
});

router.delete("/users/:id", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.json(deletedUser);
});

module.exports = router;
