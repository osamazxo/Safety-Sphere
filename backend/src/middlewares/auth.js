const jwt = require("jsonwebtoken");
const Token = require("../../models/tokens");
const User = require("../../models/users");
const isAuth = async (req, res, next) => {
  const token = req.get("token");
  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_PRIVATE_KEY);
    const userToken = await Token.findOne({ token });
    if (!decodedToken || !userToken) throw Error("Please login first");
    req.userId = decodedToken._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Please login first",
    });
  }
};

const isAdmin = async (req, res, next) => {
  // check if the user have access to add admin
  const currentUser = await User.findById(req.userId);
  if (currentUser.role !== "admin")
    return res.status("403").send({ message: "You don't have access" });
  next();
};

exports.isAuth = isAuth;
exports.isAdmin = isAdmin;
