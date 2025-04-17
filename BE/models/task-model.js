const sqlite3 = require("sqlite3");
const dbpath = "BE/tasksdatabase.db";
const db = new sqlite3.Database(dbpath);

exports.fetchTasks = () => {
  const results = db.prepare("SELECT * FROM tasks");
  console.log(results);
  return results.all();
};

exports.fetchTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE id = $1`;
};
