const readingRoutes = require("./modules/readings/readings.router");
const deviceRoutes = require("./modules/devices/devices.router");
const authRoutes = require("./modules/auth/auth.router");
const dashboardRoutes = require("./modules/dashboard/dashboard.router");
const analyticsRoutes = require("./modules/analytics/analytics.router");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const appRouter = (app, express) => {
  app.use(cors());
  app.use(express.json());
  app.use("/readings", readingRoutes);
  app.use("/devices", deviceRoutes);
  app.use("/auth", authRoutes);
  app.use("/", dashboardRoutes);
  app.use("/", analyticsRoutes);
  app.all("*", (req, res) => {
    return res.status(404).send({ message: "Not found" });
  });
  app.use(errorHandler);
};

module.exports = appRouter;
