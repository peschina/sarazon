const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { categorySchema } = require("./category");

const cartProductSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  price: {
    type: Number,
    min: 3,
    required: true
  },
  numberInStock: { type: Number, min: 0, required: true },
  selectedQuantity: {
    type: Number,
    min: 1,
    default: 1
  },
  category: {
    type: categorySchema,
    required: true
  }
});

const joiCartSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        _id: Joi.objectId().required(),
        selectedQuantity: Joi.number()
          .min(1)
          .required()
      })
    )
    .required()
});

const validate = cart => joiCartSchema.validate(cart);

exports.validate = validate;
exports.cartProductSchema = cartProductSchema;
