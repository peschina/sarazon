const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validate } = require("../models/wishlist");
const { Product } = require("../models/product");
const { User } = require("../models/user");

router.get("/", [auth], async (req, res) => {
  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);
  res.send(user.wishlist);
});

router.put("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);

  const product = await Product.findById(req.body._id);
  if (!product) return res.status(404).send("Product not found");
  const { _id, name, price } = product;
  const newProduct = {
    _id: _id,
    name: name,
    price: price
  };

  const toBeRemoved = user.wishlist.filter(p => p._id.equals(newProduct._id));
  const wishlist =
    toBeRemoved.length === 0
      ? [...user.wishlist, newProduct]
      : user.wishlist.filter(p => !p._id.equals(newProduct._id));

  const { n, nModified } = await User.updateOne(
    { _id: userId },
    { wishlist: wishlist }
  );

  res.send(
    n && nModified
      ? "Update successfull"
      : { message: "Wishlist was not updated", n, nModified }
  );
});

module.exports = router;
