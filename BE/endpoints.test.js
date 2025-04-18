const app = require("../app");
const request = require("supertest");

test("GET/ getTasks will return all tasks in database", async () => {
  const result = await request(app).get("/tasks");
  console.log(result.body);
  expect(task).toBe();
});
