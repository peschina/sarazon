const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const { categoryId, latest, sponsored } = req.query;
  let products = await Product.find().sort("name");
  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).send("Invalid category");
    const { _id, name } = category;

    products = await Product.find({
      category: { _id, name }
    });
    if (latest) {
      products = await Product.find({
        category: { _id, name }
      })
        .sort({ insertionDate: -1 })
        .limit(2);
    }
  }
  if (sponsored) {
    products = await Product.find()
      .sort({ insertionDate: -1 })
      .limit(3);
  }
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.send(product);
});

router.post("/", [auth, admin], async (req, res) => {
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
    name,
    price,
    category: {
      _id: category._id,
      name: category.name
    },
    image,
    description,
    numberInStock
  });
  await product.save();
  res.send(product);
});

router.put("/:id", [auth, admin], async (req, res) => {
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
      name,
      price,
      category: {
        _id: category._id,
        name: category.name
      },
      image,
      description,
      numberInStock
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
