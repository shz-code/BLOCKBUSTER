const router = require("express").Router();
const { User } = require("../models/user");
const { Wallet } = require("../models/wallet");

const handleGet = async (req, res) => {};

const handlePost = async (req, res) => {
  const body = req.body;
  const user = new User(body);
  const wallet = new Wallet({
    wallet_id: body.user_id,
    balance: body.balance,
    wallet_user: {
        user_id: body.user_id,
        user_name: body.user_name
    }
  })
  try {
    await user.save();
    await wallet.save();
    return res.status(201).send(body);
  } catch (err) {
    return res.status(404).send("Bad Request");
  }
};

router.route("/").get(handleGet).post(handlePost);

module.exports = router;
