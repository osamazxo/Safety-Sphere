const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  device: {
    type: Types.ObjectId,
    required: true,
    ref: "devices",
  },
});

module.exports = model("users", userSchema);
