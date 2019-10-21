const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser, validatePassword } = require("../models/user");

router.post("/", async (req, res) => {
  const { error: pwError } = validatePassword(req.body.password);
  if (pwError) return res.status(400).send(pwError.details[0].message);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Invalid email or password");

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
