const taskRouter = require("express").Router();
const {
  getTasks,
  getTaskById,
  postTask,
  deleteTask,
  updateTaskStatus,
} = require("../BE/controllers/task-controller");

taskRouter.get("/", getTasks);
taskRouter.post("/", postTask);
taskRouter.get("/:id", getTaskById);
taskRouter.delete("/:id", deleteTask);
taskRouter.patch("/:id", updateTaskStatus);

module.exports = { taskRouter };
