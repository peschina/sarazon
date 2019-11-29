const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { categorySchema } = require("./category");

const wishlistProductSchema = new mongoose.Schema({
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
  category: {
    type: categorySchema,
    required: true
  }
});

const joiWishlistSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        _id: Joi.objectId().required()
      })
    )
    .required()
});

const validate = wishlist => joiWishlistSchema.validate(wishlist);

exports.validate = validate;
exports.wishlistProductSchema = wishlistProductSchema;
