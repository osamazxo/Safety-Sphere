const { Schema, model } = require("mongoose");

const deviceSchema = new Schema(
  {
    secret: {
      type: String,
      required: true,
      default: (Math.random() * 10000000).toFixed(0),
    },
  },
  { timestamps: true }
);

module.exports = model("devices", deviceSchema);
