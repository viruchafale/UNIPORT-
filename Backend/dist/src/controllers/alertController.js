import Alert from '../models/Alert.js';
export const createAlert = async (req, res) => {
    try {
        const alert = new Alert({ ...req.body, userId: req.body.userId });
        await alert.save();
        res.status(201).json(alert);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find({ userId: req.query.userId });
        res.json(alerts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateAlert = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alert)
            return res.status(404).json({ error: 'Alert not found' });
        res.json(alert);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteAlert = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndDelete(req.params.id);
        if (!alert)
            return res.status(404).json({ error: 'Alert not found' });
        res.json({ message: 'Alert deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=alertController.js.map