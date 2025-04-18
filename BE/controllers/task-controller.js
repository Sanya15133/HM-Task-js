const { fetchTaskById, fetchTasks } = require("../models/task-model");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await fetchTasks();
    if (tasks.length === 0) {
      console.log("No tasks found in DB");
    }
    res.status(200).send({ tasks });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await fetchTaskById(id);
    if (task.length === 0) {
      console.log("No tasks found in DB");
    }
    res.status(200).send({ task });
  } catch (err) {
    next(err);
  }
};
