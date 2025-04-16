const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("Listening on port3000");
});

app.use("/", (req, res) => {});
