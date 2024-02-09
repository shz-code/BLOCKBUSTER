const { Schema, model } = require("mongoose");

const stationSchema = Schema(
  { },
  { timestamps: true }
);

module.exports.User = model("Station", stationSchema);

