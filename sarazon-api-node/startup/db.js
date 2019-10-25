const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function() {
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
	
  // the database string will come from a configuration file
  mongoose
  .connect("mongodb://localhost/sarazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(winston.info("connected to db..."))
};
