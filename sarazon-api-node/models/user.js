const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const PasswordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
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
  }
});

const User = mongoose.model("User", userSchema);

const joiUserSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .min(5)
    .max(200)
    .required(),
  // password will be validated with password-complexity package before
  password: Joi.string().required()
});

const validatePassword = pw => new PasswordComplexity().validate(pw);
const validateUser = user => joiUserSchema.validate(user);

exports.User = User;
exports.validateUser = validateUser;
exports.validatePassword = validatePassword;
