const app = require("../app");
const request = require("supertest");

test("GET/ getTasks will return all tasks in database", async () => {
  const result = await request(app).get("/tasks");
  expect(result.status).toBe(200);
  expect(Array.isArray(result.body.tasks)).toBe(true);
  const resultArray = result.body.tasks;
  resultArray.forEach((result) => {
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("duedate");
  });
});
test.only("GET/ getTasksById:id will return task by ID", async () => {
  const result = await request(app).get("/tasks/10");
  const resultArray = result.body.task;
  resultArray.forEach((result) => {
    expect(result).toMatchObject({
      description: expect.any(String),
      duedate: expect.any(String),
      id: expect.any(Number),
      status: expect.any(String),
    });
  });
});
