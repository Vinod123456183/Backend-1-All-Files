// it is an obje bec . kga h
// to import indexController.homeController  bec it is an objext
// so we can directly get by putting {}
const randomUserName = require("../utils/random-username");

module.exports.homeController = (req, res) => {
  const randomNumber = randomUserName().toString("hex");
  res.render("index", { randomNumber });
};
