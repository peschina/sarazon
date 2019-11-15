const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50
  }
});

const Category = mongoose.model("Category", categorySchema);

const joiCategorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
});

const validateCategory = obj => joiCategorySchema.validate(obj);

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
