const express = require("express");
const router = express.Router();

const {
  indexController,
  createUser,
  readAllUser,
  readOne,
  editController,
  updateController,
} = require("../controllers/index-controller");

router.get("/", indexController);
router.post("/submit", createUser);

router.get("/read", readAllUser);
router.get("/readOne", readOne);

router.get("/edit/:id", editController);
router.put("/update/:id", updateController);

module.exports = router;
