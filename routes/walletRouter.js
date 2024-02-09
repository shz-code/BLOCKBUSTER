const router = require("express").Router();
const { Wallet } = require("../models/wallet");

const handleGet = async (req, res) => {
    try {
        const walletId = req.params.wallet_id; 
        const wallet = await Wallet.findOne({ wallet_id: walletId });
        
        if (!wallet) {
            return res.status(404).json({ message: `wallet with id: ${walletId} was not found`});
        }

        return res.json({ wallet });
    } catch (error) {
        console.error('Error fetching wallet:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const handleUpdateWalletBalance = async (req, res) => {
    try {
        const walletId = req.params.wallet_id; 
        const newBalance = req.body.recharge; 

        if(newBalance<100 || newBalance>10000){
            return res.status(400).json({ message: `invalid amount: ${newBalance}`});
        }
        
        const updatedWallet = await Wallet.findOneAndUpdate(
            { wallet_id: walletId },
            { $inc: { balance: newBalance } },
            { new: true } 
        );



        
        if (!updatedWallet) {
            return res.status(404).json({ message: `wallet with id: ${walletId} was not found`});
        }

        return res.json({
            "wallet_id": walletId,
            "wallet_balance": updatedWallet.balance,
            "wallet_user": updatedWallet.wallet_user
        });
    } catch (error) {
        console.error('Error fetching wallet:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

router.route("/:wallet_id").get(handleGet).put(handleUpdateWalletBalance);
module.exports = router;
