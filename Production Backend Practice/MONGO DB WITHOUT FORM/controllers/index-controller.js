const userModel = require("../models/user-model");

const indexController = (req, res) => {
  res.render("addUser");
};

const createUser = async (req, res) => {
  const { name, userName, email, phone } = req.body;
  let user = await userModel.create({
    name,
    userName,
    email,
    phone,
  });
  res.json({ message: "User Created And Saved To DB" });
};

const readAllUser = async (req, res) => {
  const users = await userModel.find();
  res.render("index", { users: users });
};

const readOne = (req, res) => {
  userModel
    .findOneAndUpdate(
      { _id: "67d456ce03bd6e1d1812f3be" },
      { name: "XXX" },
      { new: true }
    )
    .then(() => res.send("Updated"));
};

const editController = async (req, res) => {
  const { id } = req.params;
  const user = await userModel
    .findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).render("Error");
      }
      res.render("edit", { user });
    })
    .catch(() => {
      res.status(500).render("error", { message: "Internal Server Error" });
    });
};

const updateController = (req, res) => {
  const { id } = req.params;
  const user = userModel
    .findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
    .then((user) => {
      if (!user) {
        req.status(404).render("Error");
      }
      console.log("Updated");
      res.render("/read");
    })
    .catch(() => {
      res.status(500).render("error ", { message: "Internal Server Error" });
    });
};

module.exports = {
  indexController,
  createUser,
  readAllUser,
  readOne,
  editController,
  updateController,
};
