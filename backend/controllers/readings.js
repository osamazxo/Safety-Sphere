const Reading = require("../models/readings");
const Device = require("../models/devices");

const addReading = async (req, res) => {
  const { device, secret, ...others } = req.query;

  const currentDevice = await Device.findById(device);
  if (!currentDevice) throw Error("Device not found");
  if (currentDevice.secret !== secret) throw Error("Incorrect device secret");

  const newReading = new Reading({ device, ...others });
  newReading.save();

  res.send(newReading);
};

exports.addReading = addReading;
