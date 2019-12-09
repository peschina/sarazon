const request = require("supertest");
const { User } = require("../../../models/user");
const { Product } = require("../../../models/product");
const { Category } = require("../../../models/category");

let server;

describe("admin middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
    await Product.deleteMany({});
  });

  const exec = async () => {
    const category = await new Category({ name: "category1" }).save();
    return await request(server)
      .post("/api/products")
      .set("x-auth-token", token)
      .send({
        name: "product1",
        price: 3,
        categoryId: category._id.toHexString(),
        description: new Array(21).join("a"),
        numberInStock: 1
      });
  };

  it("should return 403 if user is not admin", async () => {
    token = new User().generateAuthToken();
    const res = await exec();
    expect(res.status).toBe(403);
  });

  it("should return 200 if token is valid", async () => {
    token = new User({ isAdmin: true }).generateAuthToken();
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
