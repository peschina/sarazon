const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { productSchema } = require("./product");

const orderSchema = new mongoose.Schema({
  creationDate: { type: Date, default: new Date().toLocaleDateString() },
  products: [{ type: productSchema, required: true }],
  deliveryAddress: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
});

const joiOrderSchema = Joi.object({
  products: Joi.array()
    .items(Joi.objectId().required())
    .required(),
  deliveryAddress: Joi.string().required()
});

const validateOrder = order => joiOrderSchema.validate(order);

exports.validate = validateOrder;
exports.orderSchema = orderSchema;
