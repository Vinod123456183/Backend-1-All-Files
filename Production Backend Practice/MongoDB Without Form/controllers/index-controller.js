const userModel = require("../models/user-model");

const homeController = (req, res) => {
  console.log("index Router");
  res.send("index");
};

const createUser = async (req, res) => {
  try {
    const user = await userModel.create({
      name: "Vinod Singh barti",
      phone: 9456542,
      email: "test3@gmail.com",
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const readAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ users });
};

const updateUser = async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { name: "Vinod" },
    { name: "Binod" },
    { new: true }
  );
  console.log(user);
  res.json("User Updated Succesfully ");
};

const deleteUser = async (req, res) => {
  const User = userModel.findOneAndDelete({ name: "Binod" });
  console.log(User);
  res.json("User Deleted Succesfully");
};

module.exports = {
  homeController,
  createUser,
  readAllUsers,
  updateUser,
  deleteUser,
};
