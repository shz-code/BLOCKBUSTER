const { Schema, model } = require("mongoose");

const trainSchema = Schema(
  {
    train_id: Number,
    train_name: String,
    capacity: Number,
    stops: [
      {
        station_id: {
          type: Number,
          ref: "Station"
        },
        arrival_time: String,
        departure_time: String,
        fare: Number,
      }
    ]
  },
  { timestamps: true }
);

module.exports.Train = model("Train", trainSchema);

