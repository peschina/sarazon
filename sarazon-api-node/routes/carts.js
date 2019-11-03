const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validate } = require("../models/cart");
const { Product } = require("../models/product");
const { User } = require("../models/user");

router.get("/", [auth], async (req, res) => {
  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);

  res.send(user.cart);
});

router.put("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);

  const { _id: productId, selectedQuantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send("Product not found");
  const { _id, name, price, numberInStock } = product;
  let cartProducts = user.cart.filter(p => !p._id.equals(product._id));
  if (selectedQuantity !== 0) {
    const cartProduct = {
      _id: _id,
      name: name,
      price: price,
      numberInStock: numberInStock,
      selectedQuantity: selectedQuantity
    };
    cartProducts = [...cartProducts, cartProduct];
  }

  const { n, nModified } = await User.updateOne(
    { _id: userId },
    { cart: cartProducts }
  );

  res.send(
    n && nModified
      ? "Update successfull"
      : { message: "Cart was not updated", n, nModified }
  );
});

module.exports = router;
