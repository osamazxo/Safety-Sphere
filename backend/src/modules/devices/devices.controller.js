const Device = require("../../../models/devices");
const User = require("../../../models/users");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("../../middlewares/asyncHandler");

const getDeviceObject = async (req) => {
  const deviceId = req.params["deviceId"];
  const device = await Device.findById(deviceId);
  if (!device) res.status("400").send({ message: "Device id is not correct" });
  return device;
};

const getDevices = asyncHandler(async (req, res) => {
  const devices = await Device.find().populate("user", "userName");
  return res.status(200).send({
    message: "done",
    devices,
  });
});

const getDevice = asyncHandler(async (req, res) => {
  const device = await getDeviceObject(req);
  return res.status(200).send({
    message: "done",
    device,
  });
});

const addDevice = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  // check if username already exists
  const user = await User.findOne({
    userName: userName,
  });
  if (user) throw new Error("Username already exists");

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
  return res.status(201).send(await newDevice.populate("user", "userName"));
});

const editDevice = asyncHandler(async (req, res) => {
  const { password, secret } = req.body;
  const device = await getDeviceObject(req);
  if (password) {
    const hashedPass = await bcrypt.hash(password, 12);
    const deviceUser = await User.findById(device.user);
    await deviceUser.updateOne({ password: hashedPass });
  }
  if (secret) {
    await device.updateOne({ secret });
  }
  return res.status(200).send({
    message: "Device was updated successfully",
  });
});

const deleteDevice = asyncHandler(async (req, res) => {
  const device = await getDeviceObject(req);
  const deviceUser = await User.findById(device.user);
  await deviceUser.deleteOne();
  await device.deleteOne();
  return res.status(200).send({ message: "Device was deleted successfully" });
});

exports.getDevices = getDevices;
exports.getDevice = getDevice;
exports.addDevice = addDevice;
exports.editDevice = editDevice;
exports.deleteDevice = deleteDevice;
