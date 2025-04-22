const axios = require("axios");

const taskRouter = axios.create({
  baseURL: "http://localhost:3000/tasks",
});
