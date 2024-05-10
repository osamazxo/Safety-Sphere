const Reading = require("../models/readings");
const Device = require("../models/devices");
const User = require("../models/users");
const addReading = async (req, res) => {
  const { device, secret } = req.query;

  const currentDevice = await Device.findById(device);
  if (!currentDevice) throw Error("Device not found");
  if (currentDevice.secret !== secret) throw Error("Incorrect device secret");

  const newReading = new Reading({ device, ...req.body });
  newReading.save();

  res.send(newReading);
};

const getReadings = async (req, res) => {
  const currentUser = await User.findById(req.userId);
  const readings = await Reading.find({
    device: currentUser.device,
  });
  res.send(readings);
};
exports.addReading = addReading;
exports.getReadings = getReadings;
