const Device = require("../../../models/devices");
const User = require("../../../models/users");
const bcrypt = require("bcryptjs");

const getDeviceObject = async (req) => {
  const deviceId = req.params["deviceId"];
  const device = await Device.findById(deviceId);
  if (!device) res.status("400").send({ message: "Device id is not correct" });
  return device;
};

const getDevices = async (req, res) => {
  const devices = await Device.find();
  res.status(200).send({
    message: "done",
    devices,
  });
};

const getDevice = async (req, res) => {
  const device = await getDeviceObject(req);
  res.status(200).send({
    message: "done",
    device,
  });
};

const addDevice = async (req, res) => {
  const { userName, password } = req.body;
  try {
    // check if username already exists
    const user = await User.findOne({
      userName: userName,
    });
    if (user) throw Error("Username already exists");

    // creating new device
    const newDevice = new Device();

    // creating new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      device: newDevice._id,
      userName,
      password: hashedPassword,
    });
    await newUser.save();

    newDevice.user = newUser._id;
    await newDevice.save();
    res.send(newDevice);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

const editDevice = async (req, res) => {
  const { password, secret } = req.body;
  const device = await getDeviceObject(req);
  if (password) {
    try {
      const hashedPass = await bcrypt.hash(password, 12);
      const deviceUser = await User.findById(device.user);
      await deviceUser.updateOne({ password: hashedPass });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "there was an error updating password" });
    }
  }
  if (secret) {
    try {
      await device.updateOne({ secret });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "there was an error updating secret" });
    }
  }
  res.status(200).send({
    message: "Device was updated successfully",
  });
};

const deleteDevice = async (req, res) => {
  const device = await getDeviceObject(req);
  try {
    const deviceUser = await User.findById(device.user);
    await deviceUser.deleteOne();
    await device.deleteOne();
    res.status(200).send({ message: "Device was deleted successfully" });
  } catch (err) {
    res.status(400).send({
      message: "There was an error deleting this device",
    });
  }
};

exports.getDevices = getDevices;
exports.getDevice = getDevice;
exports.addDevice = addDevice;
exports.editDevice = editDevice;
exports.deleteDevice = deleteDevice;
