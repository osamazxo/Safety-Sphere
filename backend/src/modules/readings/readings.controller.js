const Reading = require("../../../models/readings");
const Device = require("../../../models/devices");
const User = require("../../../models/users");
const DailyStatics = require("../../../models/dailyStatics");
const { lookup } = require("geoip-lite");
const getDeviceObject = async (req, res) => {
  const { device: deviceId, secret } = req.query;
  const currentDevice = await Device.findById(deviceId);
  if (!currentDevice) res.status(404).send({ message: "Device not found" });
  if (currentDevice.secret !== secret)
    res.status(403).send({ message: "Incorrect device secret" });
  return currentDevice;
};
const addReading = async (req, res) => {
  const currentDevice = await getDeviceObject(req, res);
  const deviceUser = await User.findById(currentDevice.user);
  let { temperature, humidity, gas, vibration } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const ipLocation = lookup(ip);

  // update last reading of curreen device
  await currentDevice.updateOne({
    ...req.body,
    lastSeen: new Date().toISOString(),
    location: ipLocation || "Unknown",
  });

  // add the reading to daily statics
  let dailyStatics = await DailyStatics.findOne({
    date: new Date().toISOString().slice(0, 10),
  });
  if (!dailyStatics)
    dailyStatics = new DailyStatics({
      device: currentDevice._id,
    });

  if (temperature !== undefined) {
    temperature = +temperature;
    dailyStatics.temperature.count = dailyStatics.temperature.count + 1;
    dailyStatics.temperature.sum = dailyStatics.temperature.sum + temperature;
    if (temperature < dailyStatics.temperature.minimum)
      dailyStatics.temperature.minimum = temperature;
    if (temperature > dailyStatics.temperature.maximum)
      dailyStatics.temperature.maximum = temperature;

    const preferedMinTemp = deviceUser.preferences.temperatureRange.min;
    const preferedMaxTemp = deviceUser.preferences.temperatureRange.max;
    const dailyAlerts = dailyStatics.temperature.alerts;

    if (temperature < preferedMinTemp || temperature > preferedMaxTemp) {
      //check if there was a past alert ended to add new one
      if (
        dailyAlerts.length === 0 ||
        (dailyAlerts.length > 0 &&
          dailyAlerts[dailyAlerts.length - 1].endTime !== null)
      ) {
        //check if the past alert ended to add new one
        dailyAlerts.push({
          startTime: new Date().toISOString(),
          endTime: null,
          value: temperature,
        });
        // ........... send alert
        if (deviceUser.preferences.temperatureRange.active) {
          console.log("send alert");
        }
      }
    }
    // if temperature is in range
    else {
      //check if there was a past alert and end it
      if (
        dailyAlerts.length > 0 &&
        dailyAlerts[dailyAlerts.length - 1].endTime === null
      ) {
        dailyAlerts[dailyAlerts.length - 1].endTime = new Date().toISOString();
      }
    }
  }

  if (humidity !== undefined) {
    humidity = +humidity;
    dailyStatics.humidity.count = dailyStatics.humidity.count + 1;
    dailyStatics.humidity.sum = dailyStatics.humidity.sum + humidity;
    if (humidity < dailyStatics.humidity.minimum)
      dailyStatics.humidity.minimum = humidity;
    if (humidity > dailyStatics.humidity.maximum)
      dailyStatics.humidity.maximum = humidity;

    const preferedMinTemp = deviceUser.preferences.humidityRange.min;
    const preferedMaxTemp = deviceUser.preferences.humidityRange.max;
    const dailyAlerts = dailyStatics.humidity.alerts;

    if (humidity < preferedMinTemp || humidity > preferedMaxTemp) {
      //check if there was a past alert ended to add new one
      if (
        dailyAlerts.length === 0 ||
        (dailyAlerts.length > 0 &&
          dailyAlerts[dailyAlerts.length - 1].endTime !== null)
      ) {
        //check if the past alert ended to add new one
        dailyAlerts.push({
          startTime: new Date().toISOString(),
          endTime: null,
          value: humidity,
        });
        // ........... send alert
        if (deviceUser.preferences.humidityRange.active) {
          console.log("send alert");
        }
      }
    }
    // if humidity is in range
    else {
      //check if there was a past alert and end it
      if (
        dailyAlerts.length > 0 &&
        dailyAlerts[dailyAlerts.length - 1].endTime === null
      ) {
        dailyAlerts[dailyAlerts.length - 1].endTime = new Date().toISOString();
      }
    }
  }

  if (gas !== undefined) {
    const dailyAlerts = dailyStatics.gas.alerts;
    // check if there is a gas leak
    if (gas === 1) {
      // check if the last alert was ended to add new one
      if (
        dailyAlerts.length === 0 ||
        dailyAlerts[dailyAlerts.length - 1].endTime !== null
      ) {
        dailyAlerts.push({
          startTime: new Date().toISOString(),
          endTime: null,
        });
        if (deviceUser.preferences.emailGas) {
          //send email
        }
      }
    } else {
      // check if the last alert wasn't ended to end it
      if (
        dailyAlerts.length > 0 &&
        dailyAlerts[dailyAlerts.length - 1].endTime === null
      ) {
        dailyAlerts[dailyAlerts.length - 1].endTime = new Date().toISOString();
      }
    }
  }

  if (vibration !== undefined) {
    const dailyAlerts = dailyStatics.vibration.alerts;
    // check if there is a vibration leak
    if (vibration === 1) {
      // check if the last alert was ended to add new one
      if (
        dailyAlerts.length === 0 ||
        (dailyAlerts.length > 0 &&
          dailyAlerts[dailyAlerts.length - 1].endTime !== null)
      ) {
        dailyAlerts.push({
          startTime: new Date().toISOString(),
          endTime: null,
        });
        if (deviceUser.preferences.emailVibration) {
          //send email
        }
      }
    } else {
      // check if the last alert wasn't ended to end it
      if (
        dailyAlerts.length > 0 &&
        dailyAlerts[dailyAlerts.length - 1].endTime === null
      ) {
        dailyAlerts[dailyAlerts.length - 1].endTime = new Date().toISOString();
      }
    }
  }

  await dailyStatics.save();
  res.status(201).send({ message: "done" });
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
