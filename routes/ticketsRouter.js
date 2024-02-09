const router = require("express").Router();
const { Ticket } = require("../models/tickets");
const { Wallet } = require("../models/wallet");
const { Train } = require("../models/train");
const { Station } = require("../models/station");

const handlePost = async (req, res) => {
  const body = req.body;
  const wallet = await Wallet.findOne({ wallet_id: body.wallet_id });
  const trains = await Train.find();

  const timestamp = new Date();

  const [hours, minutes] = body.time_after.split(":");

  timestamp.setHours(parseInt(hours, 10));
  timestamp.setMinutes(parseInt(minutes, 10));

  requiredTime = timestamp.getTime();

  let foundRoute = [];
  let stationTrains = [];
  let calcFare = 0,foundFare = 0;
  trains.map((train) => {
    train.stops.map((stop) => {
      if (stop.station_id === Number(body.station_from)) {
        const t = new Date();
        const [h, m] = stop.departure_time.split(":");
        t.setHours(parseInt(h, 10));
        t.setMinutes(parseInt(m, 10));
        departureTime = t.getTime();
        if (requiredTime < departureTime) {
          stationTrains.push({
            station_id: stop.station_id,
            train_id: train.train_id,
            arrival_time: stop.arrival_time,
            departure_time: stop.departure_time,
          });
          calcFare += Number(stop.fare);
        }
      } else if (
        stationTrains.length > 0 &&
        stop.station_id <= Number(body.station_to)
      ) {
        stationTrains.push({
          station_id: stop.station_id,
          train_id: train.train_id,
          arrival_time: stop.arrival_time,
          departure_time: stop.departure_time,
        });
        calcFare += Number(stop.fare);
        // console.log(stop.fare);
      }
    });

    if (
      stationTrains.length &&
      stationTrains[0].station_id === Number(body.station_from) &&
      stationTrains[stationTrains.length - 1].station_id ===
        Number(body.station_to)
    ) {
      foundRoute.push([...stationTrains]);
      foundFare = calcFare;
    } else {
      stationTrains = [];
      calcFare = 0;
    }
  });

  const lastTicket = await Ticket.find().sort({ _id: -1 }).limit(1);
  let lastId;
  if (lastTicket.length) lastId = lastTicket[0].ticket_id;
  else lastId = 0;

  const ticket = new Ticket({
    ticket_id: lastId + 1,
    wallet_id: body.wallet_id,
    stations: [...foundRoute],
  });

  if (wallet.balance - foundFare < 0) {
    return res.status(402).send({
      message: `recharge amount: ${foundFare} to purchase the thicket`,
    });
  }

  if (!foundRoute.length) {
    return res.status(403).send({
      message: `no ticket available for station: ${body.station_from} to station: ${body.station_to}`,
    });
  }

  ticket.save();
  wallet.balance -= foundFare;
  wallet.save();

  return res.status(201).send({
    ticket_id: lastId + 1,
    balance: wallet.balance - foundFare,
    wallet_id: body.wallet_id,
    stations: [...foundRoute],
  });
};

router.route("/").post(handlePost);

module.exports = router;
