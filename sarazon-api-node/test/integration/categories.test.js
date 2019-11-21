const request = require("supertest");
const { Category } = require("../../models/category");
const { User } = require("../../models/user");

let server;

describe("/api/categories", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all categories", async () => {
      await Category.collection.insertMany([
        {
          name: "category1"
        },
        {
          name: "category2"
        }
      ]);

      const res = await request(server).get("/api/categories");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(c => c.name === "category1")).toBeTruthy();
      expect(res.body.some(c => c.name === "category2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get(
        "/api/categories/5dade4463d2da71edc45df71"
      );
      expect(res.status).toBe(404);
    });

    it("should return category if valid id is passed", async () => {
      const category = new Category({ name: "category1" });
      await category.save();
      const res = await request(server).get(`/api/categories/${category._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", category.name);
    });

    describe("POST /", () => {
      it("should return 401 if client is not logged in", async () => {
        const res = await request(server)
          .post("/api/categories")
          .send({ name: "genre1" });
        expect(res.status).toBe(401);
      });

      it("should return 400 if input is less than 3 characters", async () => {
        const token = new User({ isAdmin: true }).generateAuthToken();

        const res = await request(server)
          .post("/api/categories")
          .set("x-auth-token", token)
          .send({ name: "a" });
        expect(res.status).toBe(400);
      });

      it("should return 400 if input is less more than 50 characters", async () => {
        const token = new User({ isAdmin: true }).generateAuthToken();

        const name = new Array(52).join("a");

        const res = await request(server)
          .post("/api/categories")
          .set("x-auth-token", token)
          .send({ name });
        expect(res.status).toBe(400);
      });

      it("should return 200 if input is valid", async () => {
        const token = new User({ isAdmin: true }).generateAuthToken();

        const res = await request(server)
          .post("/api/categories")
          .set("x-auth-token", token)
          .send({ name: "genre1" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("name", "genre1");
      });
    });
  });
});
