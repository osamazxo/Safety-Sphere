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
  email: {
    type: String,
    default: "",
  },
  device: {
    type: Types.ObjectId,
    ref: "devices",
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  lastSeen: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  preferences: {
    emailGas: {
      type: Boolean,
      required: true,
      default: true,
    },
    emailVibration: {
      type: Boolean,
      required: true,
      default: true,
    },
    temperatureRange: {
      active: {
        type: Boolean,
        required: true,
        default: true,
      },
      min: {
        type: Number,
        required: true,
        default: 20,
      },
      max: {
        type: Number,
        required: true,
        default: 50,
      },
    },
    humidityRange: {
      active: {
        type: Boolean,
        required: true,
        default: true,
      },
      min: {
        type: Number,
        required: true,
        default: 40,
      },
      max: {
        type: Number,
        required: true,
        default: 80,
      },
    },
  },
});

module.exports = model("users", userSchema);
