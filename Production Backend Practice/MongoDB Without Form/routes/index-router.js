const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const {
  homeController,
  createUser,
  readAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/index-controller");

router.get("/", homeController);
router.get("/create", createUser);
router.get("/readAll", readAllUsers);
router.get("/update", updateUser);
router.get("/delete", deleteUser);

module.exports = router;
