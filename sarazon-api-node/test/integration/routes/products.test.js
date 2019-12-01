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

  const populateCategory = async () => {
    return await new Category({ name: "category1" }).save();
  };

  const populateProduct = async (product, { _id, name }) => {
    return await new Product({
      name: product,
      price: 3,
      category: { _id, name },
      description: new Array(21).join("a"),
      numberInStock: 1
    }).save();
  };

  const productObject = (product, { _id, name }) => {
    return {
      name: product,
      price: 3,
      category: { _id: _id.toHexString(), name },
      description: new Array(21).join("a"),
      numberInStock: 1
    };
  };

  describe("GET /", () => {
    it("should return all products", async () => {
      const category = await populateCategory();
      await populateProduct("product1", category);
      await populateProduct("product2", category);
      const res = await request(server).get("/api/products");
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toMatchObject(productObject("product1", category));
      expect(res.body[1]).toMatchObject(productObject("product2", category));
    });

    it("should return last 3 added products", async () => {
      const category = await populateCategory();
      const names = ["product1", "product2", "product3", "product4"];
      await Promise.all(
        names.map(async n => {
          await populateProduct(n, category);
        })
      );
      const res = await request(server)
        .get("/api/products")
        .query({ sponsored: true });
      expect(res.body.length).toBe(3);
      expect(res.body[0]).toMatchObject(productObject("product1", category));
      expect(res.body[1]).toMatchObject(productObject("product2", category));
      expect(res.body[2]).toMatchObject(productObject("product3", category));
    });
  });
});
