import express from 'express';
import * as alertController from '../controllers/alertController.js';

const router = express.Router();

router.post('/', alertController.createAlert);
router.get('/', alertController.getAlerts);
router.put('/:id', alertController.updateAlert);
router.delete('/:id', alertController.deleteAlert);

export default router;
