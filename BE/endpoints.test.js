const app = require("../app");
const request = require("supertest");

test("GET/ getTasks will return all tasks in database", async () => {
  const result = await request(app).get("/tasks");
  expect(result.status).toBe(200);
  expect(Array.isArray(result.body.tasks)).toBe(true);
  const resultArray = result.body.tasks;
  resultArray.forEach((result) => {
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("duedate");
  });
});
test("GET/ getTasksById:id will return task by ID", async () => {
  const result = await request(app).get("/tasks/1");
  const resultArray = result.body.task;
  resultArray.forEach((result) => {
    expect(result).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      duedate: expect.any(String),
      id: expect.any(Number),
      status: expect.any(String),
    });
  });
});
test("GET /tasks/:id should return 404 if task not found", async () => {
  const result = await request(app).get("/tasks/9999");
  expect(result.body.task.status).toBe(404);
  expect(result.body.task.msg).toBe("Task cannot be found");
});
test("POST /tasks/:id should return 201 if task succesfully posted", async () => {
  const body = {
    title: "Observations",
    description: "filing",
    status: "Pending",
    duedate: "15/09/2025",
  };
  const result = await request(app).post("/tasks").send(body);
  expect(result.status).toBe(201);
});
test("POST /tasks/:id should return 400 bad task, if missing parameters", async () => {
  const body = {
    duedate: "16/09/2025",
    status: "Pending",
  };
  const result = await request(app).post("/tasks").send(body);
  expect(result.body.task.status).toBe(400);
  expect(result.body.task.msg).toBe("Missing Parameters");
});
test("DELETE /tasks/:id should delete task by id", async () => {
  const result = await request(app).delete("/tasks/1");
  console.log(result.status);
  expect(result.status).toBe(202);
  expect(result.text).toBe("Task has been deleted");
});
test("DELETE /tasks/:id should send error when given non-existent id", async () => {
  const result = await request(app).delete("/tasks/61");
  expect(result.status).toBe(404);
  expect(result.text).toBe("Task cannot be found");
});
test("PATCH /tasks/:id should update status when given valid id", async () => {
  const status = { status: "Complete" };
  const result = await request(app).patch("/tasks/1").send(status);
  expect(result.status).toBe(200);
  expect(result.body.msg).toBe("Task status has been updated");
});
test("PATCH /tasks/:id should return errror msg when given non-existant id", async () => {
  const status = { status: "Complete" };
  const result = await request(app).patch("/tasks/10").send(status);
  expect(result.status).toBe(404);
  expect(result.body.msg).toBe("Task cannot be found");
});
