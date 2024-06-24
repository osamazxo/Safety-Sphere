const Device = require("../../../models/devices");
const User = require("../../../models/users");
const DailyStatics = require("../../../models/dailyStatics");
const ActiveDevices = require("../../../models/activeDevices");
const Alert = require("../../../models/alerts");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const CustomError = require("../../utils/CustomError");

const getDeviceObject = async (req, res) => {
  const { device: deviceId, secret } = req.query;
  const currentDevice = await Device.findById(deviceId);
  if (!currentDevice) throw new CustomError("Device not found", 404);
  if (currentDevice.secret !== secret)
    throw new CustomError("Incorrect device secret", 403);
  return currentDevice;
};

const addReading = asyncHandler(async (req, res) => {
  const currentDevice = await getDeviceObject(req, res);
  const deviceUser = await User.findById(currentDevice.user);
  let { temperature, humidity, gas, vibration } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let ipLocation = "Egypt";
  // update last reading of curreen device
  await currentDevice.updateOne({
    ...req.body,
    lastSeen: new Date().toISOString(),
    location: ipLocation || "Unknown",
    totalReadings: currentDevice.totalReadings + 1,
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
    const lastAlert =
      dailyAlerts.length === 0
        ? null
        : await Alert.findById(dailyAlerts[dailyAlerts.length - 1]);

    if (temperature < preferedMinTemp || temperature > preferedMaxTemp) {
      //check if there was a past alert ended to add new one
      if (!lastAlert || lastAlert.endTime !== null) {
        const newAlert = new Alert({
          device: currentDevice._id,
          sensor: "temperature",
          startTime: new Date().toISOString(),
          reason:
            temperature < preferedMinTemp
              ? "Temperature is below the minimum prefered value"
              : "Temperature is above the maximum prefered value",
          endTime: null,
        });
        await newAlert.save();
        dailyAlerts.push(newAlert._id);
        // ........... send alert
        if (deviceUser.preferences.temperatureRange.active) {
          console.log("send alert");
        }
      }
    }
    // if temperature is in range
    else {
      //check if there was a past alert and end it
      if (lastAlert && lastAlert.endTime === null) {
        lastAlert.endTime = new Date().toISOString();
        await lastAlert.save();
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
    const lastAlert =
      dailyAlerts.length === 0
        ? null
        : await Alert.findById(dailyAlerts[dailyAlerts.length - 1]);

    if (humidity < preferedMinTemp || humidity > preferedMaxTemp) {
      //check if there was a past alert ended to add new one
      if (!lastAlert || lastAlert.endTime !== null) {
        //check if the past alert ended to add new one
        const newAlert = new Alert({
          device: currentDevice._id,
          sensor: "humidity",
          startTime: new Date().toISOString(),
          reason:
            humidity < preferedMinTemp
              ? "Humidity is below the minimum prefered value"
              : "Humidity is above the maximum prefered value",
          endTime: null,
        });
        await newAlert.save();
        dailyAlerts.push(newAlert._id);
        // ........... send alert
        if (deviceUser.preferences.humidityRange.active) {
          console.log("send alert");
        }
      }
    }
    // if humidity is in range
    else {
      //check if there was a past alert and end it
      if (lastAlert && lastAlert.endTime === null) {
        lastAlert.endTime = new Date().toISOString();
        await lastAlert.save();
      }
    }
  }

  if (gas !== undefined) {
    const dailyAlerts = dailyStatics.gas.alerts;
    const lastAlert =
      dailyAlerts.length === 0
        ? null
        : await Alert.findById(dailyAlerts[dailyAlerts.length - 1]);

    // check if there is a gas leak
    if (gas === 1) {
      // check if the last alert was ended to add new one
      if (!lastAlert || lastAlert.endTime !== null) {
        const newAlert = new Alert({
          device: currentDevice._id,
          sensor: "gas",
          startTime: new Date().toISOString(),
          endTime: null,
          reason: "There is a gas leak",
        });
        await newAlert.save();
        dailyAlerts.push(newAlert._id);

        if (deviceUser.preferences.emailGas) {
          //send email
        }
      }
    } else {
      // check if the last alert wasn't ended to end it
      if (dailyAlerts.length > 0 && lastAlert.endTime === null) {
        lastAlert.endTime = new Date().toISOString();
        await lastAlert.save();
      }
    }
  }

  if (vibration !== undefined) {
    const dailyAlerts = dailyStatics.vibration.alerts;
    const lastAlert =
      dailyAlerts.length === 0
        ? null
        : await Alert.findById(dailyAlerts[dailyAlerts.length - 1]);

    // check if there is a vibration leak
    if (vibration === 1) {
      // check if the last alert was ended to add new one
      if (!lastAlert || lastAlert.endTime !== null) {
        const newAlert = new Alert({
          device: currentDevice._id,
          sensor: "vibration",
          startTime: new Date().toISOString(),
          endTime: null,
          reason: "There is a vibration",
        });
        await newAlert.save();
        dailyAlerts.push(newAlert._id);

        if (deviceUser.preferences.emailVibration) {
          //send email
        }
      }
    } else {
      // check if the last alert wasn't ended to end it
      if (dailyAlerts.length > 0 && lastAlert.endTime === null) {
        lastAlert.endTime = new Date().toISOString();
        await lastAlert.save();
      }
    }
  }
  await dailyStatics.save();

  // set device active today
  const todayDate = new Date().toISOString().slice(0, 10);
  let activeDevicesToday = await ActiveDevices.findOne({
    date: todayDate,
  });
  if (!activeDevicesToday) {
    activeDevicesToday = new ActiveDevices({
      date: todayDate,
      devices: [currentDevice._id],
    });
    console.log("hellooooooo", todayDate, activeDevicesToday);

    await activeDevicesToday.save();
  } else {
    if (
      !activeDevicesToday.devices.find((ele) =>
        ele._id.equals(currentDevice._id)
      )
    )
      activeDevicesToday.devices.push(currentDevice._id);
    await activeDevicesToday.save();
  }
  return res.status(201).send({ message: "done" });
});

exports.addReading = addReading;
