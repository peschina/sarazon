const request = require("supertest");
const { Product } = require("../../../models/product");
const { Category } = require("../../../models/category");
const { User } = require("../../../models/user");

let server;

describe("/api/products", () => {
  let category, token;
  const apiUrl = "/api/products";
  beforeEach(async () => {
    server = require("../../../index");
    category = await populateCategory("category1");
    token = new User({ isAdmin: true }).generateAuthToken();
  });
  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
    await Product.deleteMany({});
  });

  const test401 = async f => {
    token = "";
    const res = await f();
    expect(res.status).toBe(401);
  };

  const test403 = async f => {
    token = new User().generateAuthToken();
    const res = await f();
    expect(res.status).toBe(403);
  };

  const test400 = async f => {
    const res = await f();
    expect(res.status).toBe(400);
  };

  const populateCategory = async name => {
    return await new Category({ name }).save();
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
      await populateProduct("product1", category);
      await populateProduct("product2", category);
      const res = await request(server).get(apiUrl);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0]).toHaveProperty("insertionDate");
      expect(res.body[0]).toMatchObject(productObject("product1", category));
      expect(res.body[1]).toHaveProperty("_id");
      expect(res.body[1]).toHaveProperty("insertionDate");
      expect(res.body[1]).toMatchObject(productObject("product2", category));
    });

    it("should return 404 if invalid category id is passed in query params", async () => {
      const res = await request(server)
        .get(apiUrl)
        .query({ categoryId: "1" });
      expect(res.status).toBe(404);
    });

    it("should return products with that category if valid category id is passed in query params", async () => {
      const category2 = await populateCategory("category2");
      await populateProduct("product1", category);
      await populateProduct("product2", category);
      await populateProduct("product3", category2);

      const res = await request(server)
        .get(apiUrl)
        .query({ categoryId: category._id.toHexString() });
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toMatchObject(productObject("product1", category));
      expect(res.body[1]).toMatchObject(productObject("product2", category));
    });

    it("should return 400 if valid category id and latest not set to true are passed in query params", async () => {
      const res = await request(server)
        .get(apiUrl)
        .query({ categoryId: category._id.toHexString() })
        .query({ latest: "1" });
      expect(res.status).toBe(400);
    });

    it("should return 400 if only latest is passed in query params", async () => {
      const res = await request(server)
        .get(apiUrl)
        .query({ latest: "1" });
      expect(res.status).toBe(400);
    });

    it("should return last 2 products with that category if valid category id and latest set to true are passed in query params", async () => {
      const category2 = await populateCategory("category2");
      await populateProduct("product1", category);
      await populateProduct("product2", category);
      await populateProduct("product3", category2);
      await populateProduct("product4", category);

      const res = await request(server)
        .get(apiUrl)
        .query({ categoryId: category._id.toHexString() })
        .query({ latest: true });
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it("should return 400 if sponsored not set to true is passed in query params", async () => {
      const res = await request(server)
        .get(apiUrl)
        .query({ sponsored: "1" });
      expect(res.status).toBe(400);
    });

    it("should return last 3 added products if sponsored set to true is passed in query params", async () => {
      const names = ["product1", "product2", "product3", "product4"];
      await Promise.all(
        names.map(async n => {
          await populateProduct(n, category);
        })
      );
      const res = await request(server)
        .get(apiUrl)
        .query({ sponsored: true });
      expect(res.body.length).toBe(3);
      expect(res.body[0]).toMatchObject(productObject("product1", category));
      expect(res.body[1]).toMatchObject(productObject("product2", category));
      expect(res.body[2]).toMatchObject(productObject("product3", category));
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get(`${apiUrl}/1`);
      expect(res.status).toBe(404);
    });

    it("should return the product if valid id is passed", async () => {
      const product = await populateProduct("product1", category);

      const res = await request(server).get(`${apiUrl}/${product._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(productObject("product1", category));
    });
  });

  describe("POST", () => {
    let name, price, categoryId, description, numberInStock;

    beforeEach(async () => {
      name = "product1";
      price = 3;
      categoryId = category._id.toHexString();
      description = new Array(21).join("a");
      numberInStock = 1;
    });

    const exec = async () => {
      return await request(server)
        .post(apiUrl)
        .set("x-auth-token", token)
        .send({
          name,
          price,
          categoryId,
          description,
          numberInStock
        });
    };

    it("should return 401 if client is not logged in", async () =>
      await test401(exec));

    it("should return 403 if user is not admin", async () =>
      await test403(exec));

    it("should return 400 if name property of input is less than 2 characters", async () => {
      name = "a";
      await test400(exec);
    });

    it("should return 400 if categoryId property of input is not a valid id", async () => {
      categoryId = "1";
      await test400(exec);
    });

    it("should return 400 if value of price property of input is less than 3", async () => {
      price = 2;
      await test400(exec);
    });

    it("should return 400 if description property of input is less than 20 characters", async () => {
      description = new Array(20).join("a");
      await test400(exec);
    });

    it("should return 400 if description property of input is more than 2000 characters", async () => {
      description = new Array(2002).join("a");
      await test400(exec);
    });

    it("should return 400 if value of numberInStock property of input is negative", async () => {
      numberInStock = -1;
      await test400(exec);
    });

    it("should save the product if input is valid", async () => {
      await exec();
      const product = await Product.find({ name: "product1" });
      expect(product).not.toBe(null);
    });

    it("should return the product if input is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("insertionDate");
      expect(res.body).toMatchObject(productObject("product1", category));
    });
  });

  describe("PUT /:id", () => {
    let name, price, categoryId, description, numberInStock;

    beforeEach(async () => {
      category2 = await populateCategory("category2");
      name = "product2";
      price = 3;
      categoryId = category2._id.toHexString();
      description = new Array(21).join("a");
      numberInStock = 1;
    });

    const exec = async () => {
      const product = await populateProduct("product1", category);
      return request(server)
        .put(`${apiUrl}/${product._id}`)
        .set("x-auth-token", token)
        .send({
          name,
          price,
          categoryId,
          description,
          numberInStock
        });
    };

    it("should return 401 if client is not logged in", async () =>
      await test401(exec));

    it("should return 403 if user is not admin", async () =>
      await test403(exec));

    it("should return 400 if name property of input is less than 2 characters", async () => {
      name = "a";
      await test400(exec);
    });

    it("should return 400 if categoryId property of input is not a valid id", async () => {
      categoryId = "1";
      await test400(exec);
    });

    it("should return 400 if value of price property of input is less than 3", async () => {
      price = 2;
      await test400(exec);
    });

    it("should return 400 if description property of input is less than 20 characters", async () => {
      description = new Array(20).join("a");
      await test400(exec);
    });

    it("should return 400 if description property of input is more than 2000 characters", async () => {
      description = new Array(2002).join("a");
      await test400(exec);
    });

    it("should return 400 if value of numberInStock property of input is negative", async () => {
      numberInStock = -1;
      await test400(exec);
    });

    it("should update and save the product if input is valid", async () => {
      await exec();
      const product = await Product.find({ name: "product2" });
      expect(product).not.toBe(null);
    });

    it("should return the updated product if input is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("insertionDate");
      expect(res.body).toMatchObject(productObject("product2", category2));
    });
  });

  describe("DELETE /:id", () => {
    let id;

    beforeEach(async () => {
      const product = await populateProduct("product1", category);
      id = product._id;
    });

    const exec = async () => {
      return await request(server)
        .delete(`${apiUrl}/${id}`)
        .set("x-auth-token", token);
    };

    it("should return 401 if client is not logged in", async () =>
      await test401(exec));

    it("should return 403 if user is not admin", async () =>
      await test403(exec));

    it("should return 404 if invalid id is passed", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should delete the product if valid id is passed", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      const product = Product.find({ name: "product1" });
      expect(product.status).toBeUndefined();
    });
  });
});
