const { Schema, Types, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("tokens", tokenSchema);
