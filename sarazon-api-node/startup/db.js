const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function() {
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(winston.info("connected to db..."));
};
