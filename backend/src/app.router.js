const readingRoutes = require("./modules/readings/readings.router");
const deviceRoutes = require("./modules/devices/devices.router");
const authRoutes = require("./modules/auth/auth.router");
const cors = require("cors");

const appRouter = (app, express) => {
  app.use(cors());
  app.use(express.json());
  app.use("/readings", readingRoutes);
  app.use("/devices", deviceRoutes);
  app.use("/auth", authRoutes);
};

module.exports = appRouter;
