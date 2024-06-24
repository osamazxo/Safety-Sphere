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
      default: "Unknown",
    },
    lastSeen: {
      type: Date,
      default: new Date().toISOString(),
      required: true,
    },
    temperature: Number,
    humidity: Number,
    vibration: Number,
    gas: Number,
    totalReadings: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("devices", deviceSchema);
