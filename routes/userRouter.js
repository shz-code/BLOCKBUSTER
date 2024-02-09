const router = require("express").Router();
const { User } = require("../models/user");

const handleGet = async (req, res) => {};

const handlePost = async (req, res) => {
  const body = req.body;
  const user = new User(body);
  try {
    await user.save();
    return res.status(201).send(body);
  } catch (err) {
    return res.status(404).send("Bad Request");
  }
};

router.route("/").get(handleGet).post(handlePost);

module.exports = router;
