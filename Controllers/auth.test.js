const request = require("supertest");
const app = require("../app");
const userModel = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

jest.mock("../Models/users");

describe("Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should return 400 if passwords do not match", async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "fatima@gmail.com",
        userName: "fatima",
        password: "12345678",
        confirmPassword: "12345679",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Passwords do not match");
    });
  });
});
