const router = require("express").Router();
const User = require("../models/user")

const handleGet = async (req,res) => {

}

router.route("/").get(handleGet).post();

module.exports = router;
