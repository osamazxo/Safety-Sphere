const DailyStatics = require("../../../models/dailyStatics");
const User = require("../../../models/users");

const getAnalytics = async (req, res) => {
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
    res.status(200).send({
      monthlyStatics: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        series: ele.temperature,
      })),
    });
  } else if (sensor === "humidity") {
    res.status(200).send({
      monthlyStatics: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        series: ele.humidity,
      })),
    });
  } else if (sensor === "gas") {
    res.status(200).send({
      gasLeaks: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        alerts: ele.gas.alerts,
      })),
    });
  } else if (sensor === "vibration") {
    res.status(200).send({
      vibrations: dailyStatics.map((ele) => ({
        date: ele.createdAt,
        alerts: ele.vibration.alerts,
      })),
    });
  } else {
    res.status(404).send({
      message: "Enter valid query parameter",
    });
  }
};

exports.getAnalytics = getAnalytics;
