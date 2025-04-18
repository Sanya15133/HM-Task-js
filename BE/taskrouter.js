const taskRouter = require("express").Router();
const {
  getTasks,
  getTaskById,
  postTask,
} = require("../BE/controllers/task-controller");

taskRouter.get("/", getTasks);
taskRouter.post("/", postTask);
taskRouter.get("/:id", getTaskById);

module.exports = { taskRouter };
