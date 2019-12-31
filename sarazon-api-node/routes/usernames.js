const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { User, validateUsername: validate } = require("../models/user");

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);

  const { username } = req.body;

  const { n, nModified } = await User.updateOne({ _id: userId }, { username });

  res.send(
    n && nModified
      ? "Update successfull"
      : { message: "User was not updated", n, nModified }
  );
});

module.exports = router;
