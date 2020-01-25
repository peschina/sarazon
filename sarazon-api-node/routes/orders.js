const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validate } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");

router.get("/", [auth], async (req, res) => {
  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);

  res.send(user.orders);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);

  const { products, deliveryAddress } = req.body;
  const orderedProducts = await Promise.all(
    products.map(async p => await Product.findById(p))
  );

  const prices = await Promise.all(
    products.map(async p => {
      const { price } = await Product.findById(p);
      return await price;
    })
  );
  const total = prices.reduce((a, b) => a + b, 0);

  const order = {
    creationDate: Date.now(),
    products: orderedProducts,
    deliveryAddress: deliveryAddress,
    totalAmount: total
  };
  const orders = [...user.orders, order];
  const { n, nModified } = await User.updateOne(
    { _id: userId },
    { orders: orders }
  );

  res.send(
    n && nModified
      ? "Update successfull"
      : { message: "Cart was not updated", n, nModified }
  );
});

module.exports = router;
