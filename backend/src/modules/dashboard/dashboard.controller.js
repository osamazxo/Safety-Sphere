const User = require("../../../models/users");
const Device = require("../../../models/devices");
const Alert = require("../../../models/alerts");
const DailyStatics = require("../../../models/dailyStatics");

const getActiveDevicesCount = async () => {
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0
  );
  const totalActiveDevices = await Device.countDocuments({
    lastSeen: {
      $gt: yesterday,
    },
  });
  return totalActiveDevices;
};

const getUserDashboard = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const currentDevice = await Device.findOne({ user: req.userId });
    const d = new Date();
    d.setDate(d.getDate() - 7);
    const lastWeekStatics = await DailyStatics.find({ createdAt: { $gt: d } });
    const lastReading = {
      temperature: currentDevice.temperature,
      humidity: currentDevice.humidity,
      gas: currentDevice.gas,
      vibration: currentDevice.vibration,
      time: currentDevice.lastSeen,
    };
    const latestAlerts = await Alert.find({ device: currentDevice._id }, [], {
      sort: { createdAt: -1 },
      limit: 5,
    });

    res.status(200).send({
      userName: currentUser.userName,
      lastReading,
      averageTempSeries: lastWeekStatics.map((ele) => ({
        date: ele.createdAt,
        average:
          ele.temperature.count === 0
            ? 0
            : (ele.temperature.sum / ele.temperature.count).toFixed(2),
      })),
      latestAlerts,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getAdminDashboard = async (req, res) => {
  try {
    const totalDevices = await Device.estimatedDocumentCount();
    const totalActiveDevices = await getActiveDevicesCount();
    const totalAlerts = await Alert.estimatedDocumentCount();
    const location = await Device.aggregate([
      {
        $group: {
          _id: "$location",
          total: { $count: {} },
        },
      },
    ]);
    const latestAlerts = await Alert.find(
      {},
      {},
      {
        sort: {
          createdAt: -1,
        },
        limit: 5,
      }
    );

    res.status(200).send({
      totalDevices,
      totalActiveDevices,
      totalAlerts,
      location,
      latestAlerts,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.getUserDashboard = getUserDashboard;
exports.getAdminDashboard = getAdminDashboard;
