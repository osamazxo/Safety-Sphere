const User = require("../../../models/users");
const Token = require("../../../models/tokens");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CustomError = require("../../utils/CustomError");
const { asyncHandler } = require("../../middlewares/asyncHandler");

const signin = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  try {
    const currentUser = await User.findOne({ userName });
    if (!currentUser) throw Error("Invalid username");
    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) throw Error("Invalid password");
    const token = jwt.sign(
      {
        userName,
        _id: currentUser._id,
      },
      process.env.AUTH_PRIVATE_KEY,
      {
        expiresIn: "7 days",
      }
    );

    // allow only 3 connected devices
    const allUserTokens = await Token.find({ user: currentUser._id });
    if (allUserTokens.length > 2) {
      await allUserTokens[0].deleteOne();
    }

    const newToken = new Token({
      token,
      user: currentUser._id,
      role: currentUser.role,
      valid: true,
    });
    await newToken.save();
    res.send({
      token,
      role: currentUser.role,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(
    req.userId,
    "_id email userName preferences"
  );
  res.status(200).send({ user: currentUser });
});

const editUser = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.userId);
  //validate password
  const { password, cpassword, email, userName } = req.body;
  let hashedPass = null;
  if (password) {
    if (password !== cpassword)
      return next(new CustomError("Password doesn't match"));
    hashedPass = await bcrypt.hash(password, 12);
  }

  if (email) {
    const emailUser = await User.findOne({ email });
    if (emailUser && !emailUser._id.equals(currentUser._id))
      return next(new CustomError("There is another user with this email"));
  }

  if (userName) {
    const userNameUser = await User.findOne({ userName });
    if (userNameUser && !userNameUser._id.equals(currentUser._id))
      throw new CustomError("There is another user with this userName");
  }
  //find and update user
  await currentUser.updateOne({ ...req.body, password: hashedPass });
  return res.status(200).send({ message: "updated successfully" });
});

const getAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find(
    { role: "admin" },
    "_id userName email lastSeen"
  );
  res.status(200).send({ admins });
});

const addAdmin = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  // check if another user with the same userName exist
  const user = await User.findOne({ userName });
  if (user) throw new CustomError("Username is already taken");

  // adding the new admin
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    userName,
    password: hashedPassword,
    role: "admin",
  });
  await newUser.save();
  res.status(201).send(newUser);
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const { userName } = req.body;
  if (userName === "admin") throw new CustomError("You can't delete this user");
  await User.findOneAndDelete({ userName });
  return res.status(200).send({ message: "User was deleted successfully" });
});

exports.signin = signin;
exports.getUser = getUser;
exports.editUser = editUser;
exports.getAdmins = getAdmins;
exports.addAdmin = addAdmin;
exports.deleteAdmin = deleteAdmin;
