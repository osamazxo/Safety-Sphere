const { Schema, model, Types } = require("mongoose");

const dailyStaticsSchema = new Schema(
  {
    date: {
      type: String,
      default: new Date().toISOString().slice(0, 10),
      required: true,
      unique: true,
    },
    device: {
      type: Types.ObjectId,
      required: true,
      ref: "devices",
    },
    day: {
      type: Number,
      required: true,
      default: new Date().getUTCDate(),
    },
    month: {
      type: Number,
      required: true,
      default: new Date().getUTCMonth() + 1,
    },
    year: {
      type: Number,
      required: true,
      default: new Date().getUTCFullYear(),
    },
    temperature: {
      minimum: {
        type: Number,
        required: true,
        default: 9999,
      },
      maximum: {
        type: Number,
        required: true,
        default: -9999,
      },
      sum: {
        type: Number,
        required: true,
        default: 0,
      },
      count: {
        type: Number,
        required: true,
        default: 0,
      },
      alerts: [{ type: String, ref: "alerts" }],
    },
    humidity: {
      minimum: {
        type: Number,
        required: true,
        default: 9999,
      },
      maximum: {
        type: Number,
        required: true,
        default: -9999,
      },
      sum: {
        type: Number,
        required: true,
        default: 0,
      },
      count: {
        type: Number,
        required: true,
        default: 0,
      },
      alerts: [{ type: String, ref: "alerts" }],
    },
    gas: {
      alerts: [{ type: String, ref: "alerts" }],
    },
    vibration: {
      alerts: [{ type: String, ref: "alerts" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("dailyStatics", dailyStaticsSchema);
