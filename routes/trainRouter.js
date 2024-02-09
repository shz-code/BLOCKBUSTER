const router = require("express").Router();
const { Train } = require("../models/train");

const handleGet = async (req, res) => {};

const handlePost = async (req, res) => {
  body = req.body;
  const train = new Train(body);

  const stops = body.stops;

  try {
    train.save();
    return res.status(201).send({
      train_id: body.train_id,
      train_name: body.train_name,
      capacity: body.capacity,
      service_start: stops[0].departure_time,
      service_ends: stops[stops.length - 1].arrival_time,
      num_stations: stops.length,
    });
  } catch (err) {
    return res.status(404).send("Bad Request");
  }
};

router.route("/").get(handleGet).post(handlePost);

module.exports = router;
