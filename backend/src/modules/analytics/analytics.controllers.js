const DailyStatics = require("../../../models/dailyStatics");
const User = require("../../../models/users");
const { asyncHandler } = require("../../middlewares/asyncHandler");

const getAnalytics = asyncHandler(async (req, res) => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  d.setHours(0, 0, 0);
  const sensor = req.query["sensor"];
  const currentUser = await User.findById(req.userId);
  const dailyStatics = await DailyStatics.find(
    {
      device: currentUser.device,
      createdAt: { $gt: d },
    },
    {},
    {
      sort: { createdAt: -1 },
    }
  ).populate("temperature.alerts humidity.alerts gas.alerts vibration.alerts");
  if (sensor === "temperature") {
    return res.status(200).send({
      monthlyStatics: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        series: ele.temperature,
      })),
    });
  } else if (sensor === "humidity") {
    return res.status(200).send({
      monthlyStatics: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        series: ele.humidity,
      })),
    });
  } else if (sensor === "gas") {
    return res.status(200).send({
      monthlyStatics: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        alerts: ele.gas.alerts,
      })),
    });
  } else if (sensor === "vibration") {
    return res.status(200).send({
      monthlyStatics: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        alerts: ele.vibration.alerts,
      })),
    });
  } else {
    return res.status(404).send({
      message: "Enter valid query parameter",
    });
  }
});

exports.getAnalytics = getAnalytics;
