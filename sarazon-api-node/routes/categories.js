const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.send(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    res.send(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const category = new Category({
      name: req.body.name
    });
    await category.save();
    res.send(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
