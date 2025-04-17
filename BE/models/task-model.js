const fetchTasks = async () => {
  const query = "SELECT * FROM tasks;";
};

const fetchTaskById = async (id) => {
  const query = "SELECT * FROM tasks WHERE id = $1";
};
