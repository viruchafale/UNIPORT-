import Transaction from '../models/Transaction.js';
export const createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction({ ...req.body, userId: req.body.userId });
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.query.userId });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction)
            return res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction)
            return res.status(404).json({ error: 'Transaction not found' });
        res.json({ message: 'Transaction deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=transactionController.js.map