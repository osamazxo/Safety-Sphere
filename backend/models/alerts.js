const { Schema, model, Types } = require("mongoose");

const AlertSchema = new Schema(
  {
    device: {
      type: Types.ObjectId,
      required: true,
      ref: "devices",
    },
    sensor: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
    endTime: {
      type: Date,
      default: null,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("alerts", AlertSchema);
