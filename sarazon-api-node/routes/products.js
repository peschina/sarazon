const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.send(product);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    name,
    price,
    categoryId,
    image,
    description,
    numberInStock
  } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) return res.status(404).send("Invalid genre");
  const product = new Product({
    name: name,
    price: price,
    category: {
      _id: category._id,
      name: category.name
    },
    image: image,
    description: description,
    numberInStock: numberInStock
  });
  await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    name,
    price,
    categoryId,
    image,
    description,
    numberInStock
  } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) return res.status(404).send("Invalid genre");
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      price: price,
      category: {
        _id: category._id,
        name: category.name
      },
      image: image,
      description: description,
      numberInStock: numberInStock
    },
    { new: true }
  );
  if (!product) return res.status(404).send("Product not found");
  res.send(product);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.send(product);
});

module.exports = router;
