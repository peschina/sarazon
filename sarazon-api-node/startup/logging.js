const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: "errorfile.log",
      level: "error",
      handleExceptions: true
    })
  );

  winston.add(
    new winston.transports.Console({
      handleExceptions: true
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/sarazon",
      level: "info"
    })
  );
};
