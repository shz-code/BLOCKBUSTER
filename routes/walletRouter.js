const router = require("express").Router();
const { Wallet } = require("../models/wallet");

const handleGet = async (req, res) => {
    try {
        const walletId = req.params.wallet_id; 
        const wallet = await Wallet.findOne({ wallet_id: walletId });
        
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        return res.json({ wallet });
    } catch (error) {
        console.error('Error fetching wallet:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

router.route("/:wallet_id").get(handleGet);
module.exports = router;
