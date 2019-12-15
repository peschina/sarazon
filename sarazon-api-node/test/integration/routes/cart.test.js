const request = require("supertest");
const { Category } = require("../../../models/category");
const { User } = require("../../../models/user");
const { Product } = require("../../../models/product");

let server;

describe("/api/carts", () => {
  let token, category, product, selectedQuantity, _id;

  beforeEach(async () => {
    server = require("../../../index");
    category = await new Category({ name: "category1" }).save();
    product = await new Product({
      name: "product1",
      price: 3,
      category: { _id: category._id.toHexString(), name: category.name },
      description: new Array(21).join("a"),
      numberInStock: 1
    }).save();
    (_id = product._id), (selectedQuantity = 1);
    user = new User({
      username: "name1",
      password: "ABC1234!",
      email: "name@gmail.com",
      cart: [
        {
          name: "product1",
          price: 3,
          numberInStock: 1,
          selectedQuantity,
          category: category
        }
      ]
    });
    await user.save();
    token = user.generateAuthToken();
  });

  afterEach(async () => {
    server.close();
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await request(server)
        .get("/api/carts")
        .set("x-auth-token", token);
      expect(res.status).toBe(401);
    });

    it("should return the user cart", async () => {
      const res = await request(server)
        .get("/api/carts")
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0]).toMatchObject({
        name: "product1",
        price: 3,
        numberInStock: 1,
        selectedQuantity,
        category: { _id: category._id.toHexString(), name: category.name }
      });
    });

    describe("POST /", () => {
      const exec = async () => {
        return await request(server)
          .post("/api/carts")
          .set("x-auth-token", token)
          .send({
            products: [{ _id, selectedQuantity }]
          });
      };

      it("should return 401 if client is not logged in", async () => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it("should return 400 if value of selectedQuantity in input is minor than 1", async () => {
        selectedQuantity = 0;
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it("should return 400 if input has an invalid id", async () => {
        _id = "a";
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should update the cart", async () => {
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });
  });
});
