const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const listModel = require("../models/list-model");
const mongoose = require("mongoose");

const indexController = (req, res) => {
  res.render("index");
};

const registerController = async (req, res) => {
  const { userName, email, password } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (existingUser) {
    const errorMessage =
      existingUser.userName === userName
        ? "Username Already Taken"
        : "Email Already Registered";

    return res.status(400).json({ message: errorMessage });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ userName, email, password: hashedPassword });

  await user
    .save()
    .then(() => res.status(200).json({ user }))
    .catch(() => res.status(500).json({ message: "Failed to create user" }));
};

// const signInController = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email });
//   if (!user) {
//     return res
//       .status(404)
//       .json({ message: "User not found || Please Sign Up" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(400).json({ message: "Invalid Credentials" });
//   }

//   res.status(200).json({ message: "Sign in successful", user });
// };

const signInController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found || Please Sign Up" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  req.session.user = user;
  res.redirect("/todo");
};

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/signinDetails");
};

// const addTaskController = async (req, res) => {
//   const { title, body, email } = req.body;
//   const existingUser = await userModel.findOne({ email }).populate("listModel");

//   if (!existingUser) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const newTask = new listModel({ title, body, user: existingUser._id });
//   await newTask.save();

//   existingUser.listModel.push(newTask); // Correct field name
//   await existingUser.save();

//   res.status(200).json(newTask);
// };

const addTaskController = async (req, res) => {
  const { title, body, email } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  const newTask = await listModel.create({
    title,
    body,
    user: existingUser._id,
  });
  console.log("New Task Created:", newTask);

  await userModel.findByIdAndUpdate(existingUser._id, {
    $push: { listModel: newTask._id },
  });

  res.redirect("/list");
};

const logController = (req, res) => {
  res.render("signUp");
};

const signInDetailsController = (req, res) => {
  res.render("signIn");
};

const addTask = (req, res) => {
  res.render("addtask");
};

const updateAddTask = async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedTask = await listModel.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true } // Returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

const renderUpdateTaskForm = async (req, res) => {
  console.log("Task ID:", req.params.id); // Ensure ID is received correctly
  const task = await listModel.findById(req.params.id).populate("user");

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.render("updateTask", { task });
};

const deleteTask = async (req, res) => {
  try {
    const { email } = req.body;
    const taskId = req.params.id;

    console.log("Received Email:", email);
    console.log("Task ID:", taskId);

    const existingUser = await userModel.findOne({ email });
    console.log("Existing User Found:", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedTask = await listModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await userModel.findOneAndUpdate(
      { email },
      { $pull: { listModel: taskId } },
      { new: true }
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

const getTaskController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const list = await listModel.find({ user: id }).sort({ createdAt: -1 });

  if (!list.length) {
    return res.status(404).json({ message: "No tasks created" });
  }

  res.status(200).json({ list });
};

const aboutPage = (req, res) => {
  res.render("about");
};

const todoController = (req, res) => {
  res.render("todo");
};

// const listController = async (req, res) => {
//   const { user } = req.session;

//   if (!user) {
//     return res.redirect("/signinDetails");
//   }

//   const tasks = await listModel
//     .find({ user: user._id })
//     .sort({ createdAt: -1 });

//   res.render("list", { tasks });
// };
const listController = async (req, res) => {
  console.log("Session Data:", req.session);

  if (!req.session.user) {
    console.log("User not logged in");
    return res.redirect("/signinDetails");
  }

  const tasks = await listModel
    .find({ user: req.session.user._id })
    .sort({ createdAt: -1 });

  console.log("Tasks Found:", tasks); // Confirm retrieved data
  res.render("list", { tasks });
};

module.exports = {
  indexController,
  registerController,
  logController,
  signInController,
  signInDetailsController,
  addTaskController,
  updateAddTask,
  addTask,
  renderUpdateTaskForm,
  deleteTask,
  getTaskController,
  aboutPage,
  todoController,
  isAuthenticated,
  listController,
};
