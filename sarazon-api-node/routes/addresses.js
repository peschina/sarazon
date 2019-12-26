const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { validate } = require("../models/address");

router.get("/", [auth], async (req, res) => {
  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);
  const user = await User.findById(userId);
  res.send(user.addresses);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const token = req.header("x-auth-token");
  const userId = jwt.decode(token);

  const { addresses } = req.body;
  const { n, nModified } = await User.updateOne({ _id: userId }, { addresses });

  res.send(
    n && nModified
      ? "Update successfull"
      : { message: "User addresses were not updated", n, nModified }
  );
});

module.exports = router;
