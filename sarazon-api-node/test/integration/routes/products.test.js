const request = require("supertest");
const { Product } = require("../../../models/product");
const { Category } = require("../../../models/category");

let server;

describe("/api/products", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
    await Product.deleteMany({});
  });

  it("should return all products", async () => {
    const category = new Category({ name: "category1" });
    await category.save();

    await Product.collection.insertMany([
      {
        name: "product1",
        price: "3",
        categoryId: category._id,
        description: new Array(21).join("a"),
        numberInStock: "1"
      },
      {
        name: "product2",
        price: "3",
        categoryId: category._id,
        description: new Array(21).join("a"),
        numberInStock: "1"
      }
    ]);

    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.some(c => c.name === "product1")).toBeTruthy();
    expect(res.body.some(c => c.name === "product2")).toBeTruthy();
  });
});
