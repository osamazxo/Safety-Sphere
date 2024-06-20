const jwt = require("jsonwebtoken");
const Token = require("../../models/tokens");
const isAuth = async (req, res, next) => {
  const token = req.get("token");
  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_PRIVATE_KEY);
    const userToken = await Token.findOne({ token });
    if (!decodedToken || !userToken) throw Error("Please login first");
    console.log(decodedToken);
    req.userId = decodedToken._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      message: "Please login first",
    });
  }
};

exports.isAuth = isAuth;
