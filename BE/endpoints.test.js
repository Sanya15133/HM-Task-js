const app = require("../app");
const request = require("supertest");

test("GET/ getTasks will return all tasks in database", async () => {
  const result = await request(app).get("/tasks");
  console.log(result.body.tasks, "here in test");
  expect(result.status).toBe(200);
  expect(Array.isArray(result.body.tasks)).toBe(true);
});
test.only("GET/ getTasksById:id will return task by ID", async () => {
  const result = await request(app).get("/tasks/8");
  console.log(result.body.task, "here in test");
  expect(result.status).toBe(200);
  expect(Array.isArray(result.body.task)).toBe(true);
});
