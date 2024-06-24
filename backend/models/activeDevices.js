const { Schema, Types, model } = require("mongoose");

const ActiveDevicesSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      default: new Date().toISOString().substring(0, 10),
      unique: true,
    },
    devices: [
      {
        type: Types.ObjectId,
        ref: "devices",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("activeDevices", ActiveDevicesSchema);
