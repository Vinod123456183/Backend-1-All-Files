const express = require("express");
const router = express.Router();
// if we dont use {} then indexController/homeController in line 6
const { homeController } = require("../controllers/index-controller");

router.get("/", homeController);

module.exports = router;
