const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
  // IMAGE
  numberInStock: { type: Number, min: 0, required: true },
  selectedQuantity: {
    type: Number,
    // MAX IS EQUAL TO NUMBERINSTOCK
    min: 1,
    default: 1
  }
});

const joiCartSchema = Joi.object({
  _id: Joi.objectId().required(),
  selectedQuantity: Joi.number()
    .min(0)
    .required()
});

const validate = cart => joiCartSchema.validate(cart);

exports.validate = validate;
exports.cartProductSchema = cartProductSchema;
