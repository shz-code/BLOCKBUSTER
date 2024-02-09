const router = require("express").Router();
const { Station } = require("../models/station");
const { Train } = require("../models/train");

const handleGet = async (req, res) => {
  const stations = await Station.find().select({
    station_id: 1,
    station_name: 1,
    longitude: 1,
    latitude: 1,
    _id: 0,
  });
  return res.send({
    stations: stations,
  });
};

const handlePost = async (req, res) => {
  const body = req.body;
  const station = new Station(body);
  try {
    station.save();
    return res.status(201).send(body);
  } catch (err) {
    return res.status(404).send("Bad Request");
  }
};

const handleGetStationTrains = async (req, res) => {
  const id = req.params.id;

  const station = await Station.find({ station_id: id });

  if(!station.length) return res.status(404).send({
    message: `station with id: ${id} was not found`,
  });

  const trains = await Train.find().select();

  const stationTrains = [];

  trains.filter((train) => {
    const ck = train.stops.find((stop) => stop.station_id === Number(id));
    if (ck)
      stationTrains.push({
        train_id: train.train_id,
        arrival_time: ck.arrival_time,
        departure_time: ck.departure_time,
      });
  });

  return res.send({
    station_id: id,
    trains: stationTrains,
  });

  
};

router.route("/").get(handleGet).post(handlePost);

router.route("/:id/trains").get(handleGetStationTrains);

module.exports = router;
