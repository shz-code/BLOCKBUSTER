const express = require("express");
const router = express.Router();
const { Train } = require("../models/train");
const { Station } = require("../models/station");

const findOptimizedPathByCost = async (from, to) => {
    try {
        const stations = await Station.find(); 
        const trains = await Train.find(); 

        const distances = {}; 
        const previousStation = {}; 
        const queue = []; 
        
        stations.forEach((station) => {
            distances[station.station_id] = Infinity;
            previousStation[station.station_id] = null;
        });

        distances[from] = 0; 
        
        queue.push({ station_id: from, distance: 0 });

        while (queue.length) {

            const { station_id, distance } = queue.shift();

            trains.forEach((train) => {
                train.stops.forEach((stop) => {
                    if (stop.station_id === station_id) {
                        const nextStationId = stop.station_id;
                        const costToNextStation = stop.fare;
                        const totalDistance = distance + costToNextStation;

                        if (totalDistance < distances[nextStationId]) {
                            distances[nextStationId] = totalDistance;
                            previousStation[nextStationId] = station_id;
                            queue.push({ station_id: nextStationId, distance: totalDistance });
                        }
                    }
                });
            });
        }

        const path = [];
        let currentStationId = to;
        while (currentStationId !== null) {
            path.unshift(currentStationId);
            currentStationId = previousStation[currentStationId];
        }

        return path;
    } catch (error) {
        throw new Error("Error finding optimized path by cost: " + error.message);
    }
};

const findOptimizedPathByTime = async (from, to) => {
    try {
        const stations = await Station.find(); 
        const trains = await Train.find();

        const times = {}; 
        const previousStation = {}; 
        const queue = []; 
        
        stations.forEach((station) => {
            times[station.station_id] = Infinity;
            previousStation[station.station_id] = null;
        });

        times[from] = 0; 
        
        queue.push({ station_id: from, time: 0 });

        while (queue.length) {
            const { station_id, time } = queue.shift();

            trains.forEach((train) => {
                train.stops.forEach((stop) => {
                    if (stop.station_id === station_id) {
                        const nextStationId = stop.station_id;
                        const timeToNextStation = calculateTime(stop.departure_time, stop.arrival_time);
                          const totalTime = time + timeToNextStation;

                        if (totalTime < times[nextStationId]) {
                            times[nextStationId] = totalTime;
                            previousStation[nextStationId] = station_id;
                            queue.push({ station_id: nextStationId, time: totalTime });
                        }
                    }
                });
            });
        }

        const path = [];
        let currentStationId = to;
        while (currentStationId !== null) {
            path.unshift(currentStationId);
            currentStationId = previousStation[currentStationId];
        }

        return path;
    } catch (error) {
        throw new Error("Error finding optimized path by time: " + error.message);
    }
};


const handleGet = async (req, res) => {
    try {
        const from = req.query.station_from; 
        const to = req.query.station_to; 
        const optimize = req.query.optimize; 

        if (!from || !to || !optimize) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        let path;
        if (optimize === "cost") {
            path = await findOptimizedPathByCost(from, to);
        } else if (optimize === "time") {
            path = await findOptimizedPathByTime(from, to);
            
        } else {
            return res.status(400).json({ message: "Invalid optimize parameter" });
        }

        return res.status(200).json({ path });
    } catch (error) {
        console.error("Error handling PUT request:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

router.route("/").get(handleGet);

module.exports = router;
