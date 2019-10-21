const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { categorySchema } = require("./category");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  category: {
    type: categorySchema,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 3,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 2000
  },
  numberInStock: { type: Number, min: 0, required: true },
  insertionDate: { type: Date, default: Date.now() }
});

const Product = mongoose.model("Product", productSchema);

const joiProductSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),
  categoryId: Joi.objectId().required(),
  description: Joi.string()
    .min(20)
    .max(2000)
    .required(),
  image: Joi.string().required(),
  price: Joi.number()
    .min(3)
    .required(),
  numberInStock: Joi.number()
    .min(0)
    .required(),
  insertionDate: Joi.date()
});

const validateProduct = product => joiProductSchema.validate(product);

exports.Product = Product;
exports.validate = validateProduct;
exports.productSchema = productSchema;
exports.joiProductSchema = joiProductSchema;
