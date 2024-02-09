const { Schema, model } = require("mongoose");

const stationSchema = Schema(
  {
    station_id: Number,
    station_name: String,
    longitude: Number,
    latitude: Number,
  },
  { timestamps: true }
);

module.exports.Station = model("Station", stationSchema);
