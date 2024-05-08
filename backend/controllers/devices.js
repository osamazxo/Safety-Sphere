const Device = require("../models/devices");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const addDevice = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.find({
      userName: userName,
    });
    if (user.length !== 0) throw Error("Username already exist");
    if (password.length < 8)
      throw Error("Minimum password length is 8 characters");
    const newDevice = new Device();
    await newDevice.save();
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      device: newDevice._id,
      userName,
      password: hashedPassword,
    });
    await newUser.save();
    res.send(newDevice);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

exports.addDevice = addDevice;
