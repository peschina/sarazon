const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const router = express.Router();
const { User } = require("../models/user");

const schema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .max(200)
    .required(),
  password: Joi.string()
    .min(8)
    .required()
});

const validate = req => schema.validate(req);

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
