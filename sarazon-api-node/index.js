const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const publicDir = require("path").join(__dirname, "/public");

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

app.use(express.static(publicDir));
app.get("/", (req, res) => res.send("This is sarazon homepage"));

const port = process.env.PORT;
const server = app.listen(port, () => {
  winston.info(`listening on port ${port}`);
});

module.exports = server;
