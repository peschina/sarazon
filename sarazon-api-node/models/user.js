const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("@hapi/joi");
const PasswordComplexity = require("joi-password-complexity");
const { orderSchema } = require("./order");
const { wishlistProductSchema } = require("./wishlist");
const { cartProductSchema } = require("./cart");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  isAdmin: Boolean,
  cart: [
    {
      type: cartProductSchema,
      required: true
    }
  ],
  wishlist: [
    {
      type: wishlistProductSchema,
      required: true
    }
  ],
  orders: [
    {
      type: orderSchema,
      required: true
    }
  ],
  addresses: [String]
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, username: this.username, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

const joiUserSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .min(5)
    .max(200)
    .required(),
  // password will be validated with password-complexity package first
  password: Joi.string().required()
});

const usernameSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .max(50)
    .required()
});

const validateUsername = obj => usernameSchema.validate(obj);

const validatePassword = pw => new PasswordComplexity().validate(pw);
const validateUser = user => joiUserSchema.validate(user);

exports.User = User;
exports.validateUser = validateUser;
exports.validateUsername = validateUsername;
exports.validatePassword = validatePassword;
exports.userSchema = userSchema;
