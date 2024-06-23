const errorHandler = async (error, req, res, next) => {
  res.status(error.statusCode || 400).send({
    message: error.message,
  });
  console.error(error.message, error.stack);
};

exports.errorHandler = errorHandler;
