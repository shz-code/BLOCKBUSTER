const { Schema, model } = require("mongoose");

const ticketsSchema = Schema(
    {
        ticket_id: Number, 
        wallet_id: Number, 
        stations: [
            {
                station_id: Number,
                train_id: Number,
                arrival_time: String,
                departure_time: String,
            }
        ]
        },
  { timestamps: true }
);

module.exports.Ticket = model("Ticket", ticketsSchema);

