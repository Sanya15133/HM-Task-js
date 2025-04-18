const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
const path = require("path");
const { error } = require("console");
const dbPath = path.join(__dirname, "../tasksdatabase.db");
const db = new sqlite3.Database(dbPath);

const dbAll = promisify(db.all).bind(db);

exports.fetchTasks = async () => {
  const rows = await dbAll("SELECT * FROM tasks;");
  return rows;
};

exports.fetchTaskById = async (id) => {
  const error = new Error("Task cannot be found");
  error.msg = "Task cannot be found";
  error.status = 404;
  const row = await dbAll(`SELECT * FROM tasks WHERE id = $1;`, [id]);
  if (!row || row.length === 0) {
    return error;
  }
  return row;
};
