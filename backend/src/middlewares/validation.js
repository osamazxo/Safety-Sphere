const validation = (Schema) => {
  return (req, res, next) => {
    const validationResult = Schema.validate(
      {
        ...req.params,
        ...req.body,
        ...req.query,
      },
      { abortEarly: false }
    );
    if (validationResult.error) {
      return res.status(422).json({
        // 422 Unprocessable Entity
        message: "validation error",
        ValidationError: validationResult.error.details,
      });
    }
    return next();
  };
};

const { Types } = require("mongoose");

const isValidObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("invalid objectId");
};

exports.validation = validation;
exports.isValidObjectId = isValidObjectId;
