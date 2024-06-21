const { Schema, model, Types } = require("mongoose");

const deviceSchema = new Schema(
  {
    secret: {
      type: String,
      required: true,
      default: (Math.random() * 10000000).toFixed(0),
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    location: {
      type: String,
    },
    lastSeen: {
      type: String,
      default: new Date().toISOString(),
      required: true,
    },
    temperature: {
      type: String,
      required: false,
    },
    humidity: {
      type: String,
      required: false,
    },
    vibration: {
      type: String,
      required: false,
    },
    gas: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("devices", deviceSchema);
