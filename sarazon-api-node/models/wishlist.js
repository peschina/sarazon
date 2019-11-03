const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
  }
  // IMAGE
});

const joiWishlistSchema = Joi.object({
  _id: Joi.objectId().required()
});

const validate = wishlist => joiWishlistSchema.validate(wishlist);

exports.validate = validate;
exports.wishlistProductSchema = wishlistProductSchema;
