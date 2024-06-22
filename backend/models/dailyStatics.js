const { Schema, model, Types } = require("mongoose");

const AlertType = {
  startTime: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
  endTime: {
    type: Date,
    default: null,
  },
};
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
      alerts: [
        {
          ...AlertType,
          value: {
            type: Number,
            required: true,
          },
        },
      ],
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
      alerts: [
        {
          ...AlertType,
          value: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    gas: {
      alerts: [AlertType],
    },
    vibration: {
      alerts: [AlertType],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("dailyStatics", dailyStaticsSchema);
