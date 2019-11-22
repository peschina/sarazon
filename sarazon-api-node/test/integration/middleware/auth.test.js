const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../../models/user");

let server;

describe("auth middleware", () => {
  let token;

  beforeEach(() => {
    server = require("../../../index");
    token = new User().generateAuthToken();
  });
  afterEach(() => {
    server.close();
  });

  const exec = async () => {
    return await request(server)
      .put("/api/carts")
      .set("x-auth-token", token)
      .send({
        products: [
          {
            _id: new mongoose.Types.ObjectId().toHexString(),
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
});
