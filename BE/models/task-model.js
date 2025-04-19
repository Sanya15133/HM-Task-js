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

exports.getTaskArrayToPost = async (title, description, status, duedate) => {
  const error = new Error("Missing Parameters");
  error.msg = "Missing Parameters";
  error.status = 400;
  if (!title || !description || !status || !duedate) {
    return error;
  }
  const row = await dbAll(
    `INSERT into tasks(title, description, status, duedate) VALUES ($1, $2, $3, $4);`,
    [title, description, status, duedate]
  );
  console.log(row);
  return row;
};

exports.getTaskToDelete = async (id) => {
  console.log(id);
  const row = await dbAll(`DELETE * FROM tasks WHERE id = $1;`, [id]);
  console.log(row);
  const error = new Error("Task cannot be found");
  error.msg = "Task cannot be found";
  error.status = 404;
  if (!row || row.length === 0) {
    return error;
  }
  return row;
};
