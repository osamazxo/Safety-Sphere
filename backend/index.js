const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const readingRoutes = require("./routes/readings");
const deviceRoutes = require("./routes/devices");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/readings", readingRoutes);
app.use("/devices", deviceRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
