const { Schema, model } = require("mongoose");

const walletSchema = Schema(
    {
        wallet_id: Number, 
        balance: Number, 
        wallet_user:
            {
            "user_id": Number,
            "user_name": String,
            }
        },
  { timestamps: true }
);

module.exports.User = model("Wallet", walletSchema);

