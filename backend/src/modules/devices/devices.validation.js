const joi = require("joi");
const { isValidObjectId } = require("../../middlewares/validation");

const addDeviceSchema = joi
  .object({
    userName: joi.string().min(6).max(30).required(),
    password: joi.string().min(8).max(30).required(),
  })
  .required();

const editDeviceSchema = joi.object({
  deviceId: joi.string().custom(isValidObjectId).required(),
  secret: joi.string().min(8).max(30).required(),
  password: joi.string().min(8).max(30).required(),
});

const deleteDeviceSchema = joi
  .object({
    deviceId: joi.string().custom(isValidObjectId).required(),
  })
  .required();

exports.addDeviceSchema = addDeviceSchema;
exports.editDeviceSchema = editDeviceSchema;
exports.deleteDeviceSchema = deleteDeviceSchema;
