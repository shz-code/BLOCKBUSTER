const router = require("express").Router();
const Train = require("../models/train")

const handleGet = async (req,res) => {

}

router.route("/").get(handleGet).post();

module.exports = router;
