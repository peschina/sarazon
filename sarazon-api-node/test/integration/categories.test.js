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
      const res = await request(server).get("/api/categories/1");
      expect(res.status).toBe(404);
    });

    it("should return category if valid id is passed", async () => {
      const category = new Category({ name: "category1" });
      await category.save();
      const res = await request(server).get(`/api/categories/${category._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", category.name);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/categories")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User({ isAdmin: true }).generateAuthToken();
      name = "category1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 if user is not admin", async () => {
      token = new User().generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 400 if input is less than 3 characters", async () => {
      name = "a";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if input is less more than 50 characters", async () => {
      name = new Array(52).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the category if input is valid", async () => {
      await exec();

      const category = await Category.find({ name: "category1" });
      expect(category).not.toBe(null);
    });

    it("should return the category if input is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "category1");
    });
  });
});
