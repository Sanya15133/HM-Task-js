const { fetchTaskById, fetchTasks } = require("../models/task-model");
// const fs = require("fs/promises");

exports.getTasks = (req, res, next) => {
  fetchTasks()
    .then((tasks) => {
      console.log(tasks);
      res.status(200).send({ tasks });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
