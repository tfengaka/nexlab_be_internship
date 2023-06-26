import { Router } from 'express';
import applicationRoutes from './application.route';
import authRoutes from './auth.route';
import storeRoutes from './store.route';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to the API!',
  })
);

router.use('/', authRoutes);
router.use('/stores', storeRoutes);
router.use('/applications', applicationRoutes);

export default router;
