const { Schema, model } = require("mongoose");

const trainSchema = Schema(
  {},
  { timestamps: true }
);

module.exports.User = model("Train", trainSchema);

