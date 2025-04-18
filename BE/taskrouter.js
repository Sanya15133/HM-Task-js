const taskRouter = require("express").Router();
const { getTasks, getTaskById } = require("../BE/controllers/task-controller");

taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTaskById);

module.exports = { taskRouter };
