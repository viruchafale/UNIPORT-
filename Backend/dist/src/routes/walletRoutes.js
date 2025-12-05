import express from 'express';
import * as walletController from '../controllers/walletController.js';
const router = express.Router();
router.post('/', walletController.createWallet);
router.get('/', walletController.getWallets);
router.put('/:id', walletController.updateWallet);
router.delete('/:id', walletController.deleteWallet);
export default router;
//# sourceMappingURL=walletRoutes.js.map