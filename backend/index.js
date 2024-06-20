const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const appRouter = require("./src/app.router");
const app = express();
appRouter(app, express);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
