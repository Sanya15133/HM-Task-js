const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
const path = require("path");
const dbPath = path.join(__dirname, "../tasksdatabase.db");
const db = new sqlite3.Database(dbPath);

const dbAll = promisify(db.all).bind(db);

exports.fetchTasks = async () => {
  const rows = await dbAll("SELECT * FROM tasks;");
  console.log(rows);
  return rows;
};


exports.fetchTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE id = $1;`;
};
