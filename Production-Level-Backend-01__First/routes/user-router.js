const express = require("express");
const router = express.Router();
// {} is important
const { userController } = require("../controllers/user-controller");
const { productController } = require("../controllers/product-controller");
const isLoggedIn = require("../middlewares/is-logged-in");

router.get("/", isLoggedIn, userController);
router.get("/products", productController);

module.exports = router;
