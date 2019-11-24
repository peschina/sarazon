const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUser, validatePassword } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const { error: pwError } = validatePassword(password);
  if (pwError)
    return res.status(400).send({ password: pwError.details[0].message });
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("Invalid email or password");
  user = new User({
    username,
    email,
    password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({ _id: user._id, username: username, email: email });
});

module.exports = router;
