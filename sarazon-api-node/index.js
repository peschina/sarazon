const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();
const products = require("./routes/products");
const categories = require("./routes/categories");
const users = require("./routes/users");
const auth = require("./routes/auth");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

// the database string will come from a configuration file
mongoose
  .connect("mongodb://localhost/sarazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("connected to db..."))
  .catch(err => console.log("Error", err));

app.use(express.json());
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => res.send("This is sarazon homepage"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port" + port);
});
