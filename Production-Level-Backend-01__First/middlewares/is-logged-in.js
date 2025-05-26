module.exports = function (req, res, next) {
  //  console.log("middleware is running");
  //  next();
  //  or
  //  res.redirect("/");
  //  or
  req.randomNumber = Math.random();
  next();
};
