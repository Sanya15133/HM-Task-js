const { fetchTaskById, fetchTasks } = require("../models/task-model");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await fetchTasks();
    console.log(tasks, 'in controller');
    res.status(200).send({ tasks });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
