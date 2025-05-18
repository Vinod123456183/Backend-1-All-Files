const express = require("express");
const router = express.Router();

const {
  indexController,
  registerController,
  logController,
  signInController,
  signInDetailsController,
  addTaskController,
  addTask,
  renderUpdateTaskForm,
  updateAddTask,
  deleteTask,
  getTaskController,
  aboutPage,
  todoController,
  isAuthenticated,
  listController,
} = require("../controllers/index-controller");

router.get("/", indexController);
router.get("/about", aboutPage);
router.get("/todo", todoController);

router.get("/signUp", logController);
router.post("/register", registerController);

router.get("/signinDetails", signInDetailsController);
router.post("/signin", signInController);

router.get("/add", addTask);
router.post("/addTask", addTaskController);

router.get("/updateTask/:id", renderUpdateTaskForm);
router.post("/updateTask/:id", updateAddTask);

router.get("/getTask/:id", getTaskController);

router.delete("/deleteTask/:id", deleteTask);

router.get("/list", listController);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/signinDetails");
  });
});

router.get("/todo", isAuthenticated, (req, res) => {
  res.render("todo");
});

router.post("/addTodo", isAuthenticated, async (req, res) => {
  const { title, body } = req.body;
  const newTask = new listModel({
    title,
    body,
    user: req.session.user._id,
  });

  await newTask.save();
  res.redirect("/todo");
});

module.exports = router;
