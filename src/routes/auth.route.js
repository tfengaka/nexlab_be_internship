import { Router } from 'express';
import AuthController from '~/controller/auth.controller';

const router = Router();
router.post('/sign-in', AuthController.SignIn);

export default router;
