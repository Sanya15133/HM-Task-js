const express = require("express");
const app = express();
const port = 3000;
const { taskRouter } = require("./BE/taskrouter");

app.use("/tasks", taskRouter);

app.use(express.json());

app.listen(port, () => {
  console.log("Listening on port3000");
});

module.exports = app;
