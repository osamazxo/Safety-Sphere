const { Schema, Types, model } = require("mongoose");

const readingSchema = new Schema(
  {
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
    device: {
      type: Types.ObjectId,
      required: true,
      ref: "devices",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("readings", readingSchema);
