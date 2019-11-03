const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { productSchema, joiProductSchema } = require("./product");

const orderSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now()
  },
  products: [{ type: productSchema, required: true }],
  deliveryAddress: {
    type: String,
    required: true
  },
  billingAddress: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
});

const joiOrderSchema = Joi.object({
  creationDate: Joi.date().required(),
  products: Joi.array()
    .items(joiProductSchema)
    .required(),
  deliveryAddress: Joi.string().required(),
  billingAddress: Joi.string().required(),
  totalAmount: Joi.number().required()
});

const validateOrder = order => joiOrderSchema.validate(order);

exports.validate = validateOrder;
exports.orderSchema = orderSchema;
