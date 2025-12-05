import Wallet from '../models/Wallet.js';
export const createWallet = async (req, res) => {
    try {
        const wallet = new Wallet({ ...req.body, userId: req.body.userId }); // Assuming userId is passed in body for now, or from middleware
        await wallet.save();
        res.status(201).json(wallet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find({ userId: req.query.userId }); // Assuming userId passed as query param
        res.json(wallets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!wallet)
            return res.status(404).json({ error: 'Wallet not found' });
        res.json(wallet);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findByIdAndDelete(req.params.id);
        if (!wallet)
            return res.status(404).json({ error: 'Wallet not found' });
        res.json({ message: 'Wallet deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=walletController.js.map