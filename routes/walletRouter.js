const router = require("express").Router();
const { Wallet } = require("../models/wallet");

const handleGet = async (req, res) => {
    try {
        const walletId = req.params.wallet_id; 
        const wallet = await Wallet.findOne({ wallet_id: walletId }).select({wallet_id:1,balance:1,wallet_user:1,_id:0});
        
        if (!wallet) {
            return res.status(404).json({
                message: `wallet with id: ${walletId} was not found`
            });
        }

        return res.send(wallet);
    } catch (error) {
        console.error('Error fetching wallet:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

router.route("/:wallet_id").get(handleGet);
module.exports = router;
