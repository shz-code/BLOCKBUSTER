const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    user_id: Number,
    user_name: String ,
    balance: Number,
  },
  { timestamps: true }
);

module.exports.User = model("User", userSchema);

