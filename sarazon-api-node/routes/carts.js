const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Cart, validate } = require("../models/cart");
const { Product } = require("../models/product");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const carts = await Cart.find();
  res.send(carts);
});

router.get("/: id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) return res.status(404).send("Cart not found");
  res.send(cart);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user");

  const prevCart = await Cart.findOne({ user: user });
  if (prevCart) return res.status(400).send("User already has a cart");

  const product = await Product.findById(req.body._id);
  const cartProduct = {
    _id: product._id,
    name: product.name,
    price: product.price,
    numberInStock: product.numberInStock,
    selectedQuantity: req.body.selectedQuantity
  };

  const cart = new Cart({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password
    },
    products: [cartProduct]
  });
  await cart.save();
  res.send(cart);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);
  if (!user) return res.status(400).send("Invalid user");

  const cart = await Cart.findById(req.params.id);
  if (!cart) return res.status(400).send("Cart not found");

  const product = await Product.findById(req.body._id);
  const cartProduct = {
    _id: product._id,
    name: product.name,
    price: product.price,
    numberInStock: product.numberInStock,
    selectedQuantity: req.body.selectedQuantity
  };

  const cartProducts = [
    ...cart.products.filter(p => !p._id.equals(product._id)),
    cartProduct
  ];

  const result = await Cart.updateOne(
    { _id: req.params.id },
    { products: cartProducts }
  );

  const n = result.n;
  const modified = result.nModified;
  res.send(
    n && modified
      ? "Update successfull"
      : { message: "Cart was not updated", n, modified }
  );
});

router.delete("/:id", [auth], async (req, res) => {
  const cart = await Cart.findByIdAndRemove(req.params.id);
  if (!cart) return res.status(404).send("Cart not found");
  res.send(cart);
});

module.exports = router;
