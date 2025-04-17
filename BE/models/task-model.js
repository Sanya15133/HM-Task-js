const sqlite3 = require("sqlite3");
const dbpath = "BE/tasksdatabase.db";
const db = new sqlite3.Database(dbpath);

exports.fetchTasks = async () => {
  const query = "SELECT * FROM tasks;";
  return db.all(query, (res) => {
    console.log(res);
    return res;
  });
};

exports.fetchTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE id = $1`;
};
