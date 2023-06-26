import { Router } from 'express';
import StoreController from '~/controller/store.controller';
import verifyToken from '~/middleware/verifyToken';

const router = Router();
router.get('/:ownerId', StoreController.getStoresByOwner);
router.post('/', verifyToken, StoreController.createStore);

export default router;
