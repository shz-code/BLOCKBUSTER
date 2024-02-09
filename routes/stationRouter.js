const router = require("express").Router();
const Station = require("../models/station")

const handleGet = async (req,res) => {

}

router.route("/").get(handleGet).post();

module.exports = router;
