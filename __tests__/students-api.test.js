const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

describe("Students API Enpoint Tests", () => {
  const testUser = {
    name: "Simon Beckham",
    contact: "2560998212801",
    password: "1234hkkhb3",
  };

  it("Create a new user using /api/v1/students/signup", async () => {
    const response = await request(app)
      .post("/api/v1/students/signup")
      .send(testUser)
      .expect(200);

    expect(response.text).toBe("New Student Created");
  });

  it("User logins in and gets the token using the /api/v1/students/login", async () => {
    const user = {
      name: "Simon Beckham",
      password: "1234hkkhb3",
    };

    const response = await request(app)
      .post("/api/v1/students/login")
      .send(user)
      .expect(200);

    expect(response.body).toHaveProperty("token");
  });

  afterAll(async () => {
    await prisma.student.delete({
      where: {
        name: testUser.name,
      },
    });
  });
});
