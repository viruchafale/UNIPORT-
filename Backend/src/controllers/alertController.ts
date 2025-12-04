import type { Request, Response } from 'express';
import Alert from '../models/Alert.js';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const alert = new Alert({ ...req.body, userId: req.body.userId });
    await alert.save();
    res.status(201).json(alert);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find({ userId: req.query.userId });
    res.json(alerts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json({ message: 'Alert deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
