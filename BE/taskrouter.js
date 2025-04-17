const taskRouter = require("express").Router();
const { getTasks } = require("../BE/controllers/task-controller");

taskRouter.get("/", getTasks);

module.exports = { taskRouter };
