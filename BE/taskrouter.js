const taskRouter = require("express").Router();
const {
  getTasks,
  getTaskById,
  postTask,
  deleteTask,
  updateTaskStatus,
} = require("../BE/controllers/task-controller");

// taskRouter.get("/", async (req, res) => {
//   res.json([{ id: 1, title: "Test Task" }]);
// });

taskRouter.get("/", getTasks);
taskRouter.post("/", postTask);
taskRouter.get("/:id", getTaskById);
taskRouter.delete("/:id", deleteTask);
taskRouter.patch("/:id", updateTaskStatus);

module.exports = { taskRouter };
