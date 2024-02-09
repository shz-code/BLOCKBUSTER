const { Schema, model } = require("mongoose");

const trainSchema = Schema(
  { 
    train_id: Number,
    train_name: String ,
    capacity: Number,
  },
  { timestamps: true }
);

module.exports.User = model("Train", trainSchema);

