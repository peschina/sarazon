const express = require("express");
const products = require("../routes/products");
const categories = require("../routes/categories");
const users = require("../routes/users");
const carts = require("../routes/carts");
const wishlists = require("../routes/wishlists");
const orders = require("../routes/orders");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Contro-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(express.json());
  app.use("/api/products", products);
  app.use("/api/categories", categories);
  app.use("/api/carts", carts);
  app.use("/api/wishlists", wishlists);
  app.use("/api/orders", orders);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
