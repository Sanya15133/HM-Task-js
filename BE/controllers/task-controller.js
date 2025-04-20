const {
  fetchTaskById,
  fetchTasks,
  getTaskArrayToPost,
  getTaskToDelete,
  getTasktoUpdateStatus,
} = require("../models/task-model");

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

exports.postTask = async (req, res, next) => {
  const { title, description, status, duedate } = req.body;
  try {
    const task = await getTaskArrayToPost(title, description, status, duedate);
    console.log(task);
    res.status(201).send({ task });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await getTaskToDelete(id);
    console.log(task, "controller");
    res.status(task.status).send(task.msg);
  } catch (err) {
    next(err);
  }
};

exports.updateTaskStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await getTasktoUpdateStatus(status, id);
    res.status(task.status).send(task.msg);
  } catch (err) {
    next(err);
  }
};
