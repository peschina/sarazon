const request = require("supertest");
const { Category } = require("../../../models/category");

let server;

describe("/api/categories", () => {
  beforeEach(() => {
    server = require("../../../index");
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
      +expect(res.body).toHaveProperty("name", category.name);
    });
  });
});
