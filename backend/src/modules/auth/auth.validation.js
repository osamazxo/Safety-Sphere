const joi = require("joi");

const signinSchema = joi
  .object({
    userName: joi.string().min(3).max(30).required(),
    password: joi.string().min(6).max(30).required(),
  })
  .required();

const addAdminSchema = joi
  .object({
    userName: joi.string().min(3).max(30).required(),
    password: joi.string().min(6).max(30).required(),
  })
  .required();

const deleteAdminSchema = joi
  .object({
    userName: joi.string().min(3).max(30).required(),
  })
  .required();

const editUserSchema = joi.object({
  userName: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6).max(30),
  cpassword: joi.ref("password"),
  preferences: joi.object({
    emailGas: joi.boolean(),
    emailVibration: joi.boolean(),
    temperatureRange: joi.object({
      min: joi.number(),
      max: joi.number(),
    }),
    humidityRange: joi.object({
      min: joi.number(),
      max: joi.number(),
    }),
  }),
});

exports.signinSchema = signinSchema;
exports.addAdminSchema = addAdminSchema;
exports.deleteAdminSchema = deleteAdminSchema;
exports.editUserSchema = editUserSchema;
