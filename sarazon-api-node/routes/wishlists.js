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

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);

  const { products } = req.body;
  const wishlistProducts = await Promise.all(
    products.map(async p => {
      const { _id, name, price, category } = await Product.findById(p._id);
      return {
        _id,
        name,
        price,
        category
      };
    })
  );
  const { n, nModified } = await User.updateOne(
    { _id: userId },
    { wishlist: wishlistProducts }
  );

  res.send(
    n && nModified
      ? "Update successfull"
      : { message: "Wishlist was not updated", n, nModified }
  );
});

module.exports = router;
