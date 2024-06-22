const joi = require("joi");
const { isValidObjectId } = require("../../middlewares/validation");
const addReadingSchema = joi.object({
  device: joi.string().custom(isValidObjectId),
  secret: joi.string(),
  temperature: joi.number(),
  humidity: joi.number(),
  gas: joi.number(),
  vibration: joi.number(),
});

exports.addReadingSchema = addReadingSchema;
