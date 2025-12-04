import express from 'express';
import * as transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;
