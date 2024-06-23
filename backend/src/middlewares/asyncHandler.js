const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log(error);
      return next(error);
    });
  };
};

exports.asyncHandler = asyncHandler;
