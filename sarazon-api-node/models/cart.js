const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { userSchema } = require("./user");

const productSchema = new mongoose.Schema({
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

const cartSchema = new mongoose.Schema({
  user: { type: userSchema },
  products: [
    {
      type: productSchema,
      required: true
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema);

const joiCartSchema = Joi.object({
  _id: Joi.objectId().required(),
  selectedQuantity: Joi.number()
    .min(1)
    .required()
});

const validate = cart => joiCartSchema.validate(cart);

exports.Cart = Cart;
exports.validate = validate;
