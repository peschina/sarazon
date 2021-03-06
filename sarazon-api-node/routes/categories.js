const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Category, validate } = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.send(category);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    name: req.body.name
  });
  await category.save();
  res.send(category);
});

module.exports = router;
