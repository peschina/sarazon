const request = require("supertest");
const { User } = require("../../../models/user");
const { Product } = require("../../../models/product");
const { Category } = require("../../../models/category");

let server;

describe("auth middleware", () => {
  let token;

  beforeEach(() => {
    server = require("../../../index");
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
    await Product.deleteMany({});
  });

  const exec = async () => {
    const category = new Category({ name: "aaa" });
    await category.save();
    const product = new Product({
      name: "aa",
      price: "3",
      category,
      description: new Array(21).join("a"),
      numberInStock: "1"
    });
    await product.save();

    return await request(server)
      .post("/api/carts")
      .set("x-auth-token", token)
      .send({
        products: [
          {
            _id: product._id,
            selectedQuantity: 1
          }
        ]
      });
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
