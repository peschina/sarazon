const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { userSchema, joiUserSchema } = require("./user");
const { productSchema, joiProductSchema } = require("./product");

const cartSchema = new mongoose.Schema({
  user: {
    type: userSchema,
    required: true
  },
  products: {
    type: [productSchema],
    required: true
  }
});

const Cart = mongoose.model("Cart", cartSchema);

const joiCartSchema = Joi.object({
  user: joiUserSchema,
  products: Joi.array()
    .items(joiProductSchema)
    .required()
});

const validate = (cart = joiCartSchema.validate(cart));

exports.Cart = Cart;
exports.validate = validate;
