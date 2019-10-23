const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUser, validatePassword } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { error: pwError } = validatePassword(req.body.password);
  if (pwError) return res.status(400).send(pwError.details[0].message);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Invalid email or password");
    const { username, email, password } = req.body;
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send({ _id: user._id, username: username, email: email });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
