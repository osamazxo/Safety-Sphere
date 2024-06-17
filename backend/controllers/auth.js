const User = require("../models/users");
const Token = require("../models/tokens");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signin = async (req, res) => {
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
};

const addAdmin = async (req, res) => {
  const { userName, password, secret } = req.body;
  if (secret !== "@!456145236!@")
    res.status(403).send({
      message: "You don't have access",
    });
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    userName,
    password: hashedPassword,
    role: "admin",
  });
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({
      message: "There was an error saving the new admin in database",
    });
  }
};
exports.signin = signin;
exports.addAdmin = addAdmin;
