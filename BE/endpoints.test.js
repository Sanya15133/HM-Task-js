const app = require("../app");
const request = require("supertest");

test("GET/ getTasks will return all tasks in database", async () => {
  const result = await request(app).get("/tasks");
  console.log(result.body.tasks, "here in test");
  expect(result.status).toBe(200);
  expect(Array.isArray(result.body.tasks)).toBe(true);
});
