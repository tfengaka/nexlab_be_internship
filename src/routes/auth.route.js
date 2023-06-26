import { Router } from 'express';
import AuthController from '~/controller/auth.controller';
import verifyToken from '~/middleware/verifyToken';

const router = Router();
router.post('/sign-in', AuthController.SignIn);
router.get('/me', verifyToken, AuthController.getMe);

export default router;
