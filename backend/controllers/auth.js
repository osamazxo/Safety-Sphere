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
      valid: true,
    });
    await newToken.save();
    res.send({
      token,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

exports.signin = signin;
