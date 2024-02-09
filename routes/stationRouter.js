const router = require("express").Router();
const {Station} = require("../models/station")

const handleGet = async (req,res) => {
    const stations = await Station.find().select({station_id:1,station_name:1,longitude:1,latitude:1,_id:0});
    return res.send({
        stations: stations
    })
}

const handlePost = async (req,res) => {
    const body = req.body;
    const station = new Station(body);
    try {
        station.save();
      return res.status(201).send(body);
    } catch (err) {
      return res.status(404).send("Bad Request");
    }
}

router.route("/").get(handleGet).post(handlePost);

module.exports = router;
