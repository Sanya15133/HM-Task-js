const sqlite3 = require("sqlite3");
const dbpath = "BE/tasksdatabase.db";
const db = new sqlite3.Database(dbpath);

exports.fetchTasks = () => {
  console.log("hello");
  return db.all("SELECT * FROM tasks");
};

exports.fetchTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE id = $1`;
};
