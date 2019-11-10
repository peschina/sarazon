const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

app.get("/", (req, res) => res.send("This is sarazon homepage"));

const port = process.env.PORT || 3090;
app.listen(port, () => {
  winston.info(`listening on port ${port}`);
});
