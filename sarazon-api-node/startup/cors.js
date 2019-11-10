const express = require("express");
const cors = require("cors");

module.exports = function(app) {
  let corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
};
