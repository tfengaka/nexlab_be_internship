import { Router } from 'express';
import ApplicantionController from '~/controller/applicantion.controller';
import verifyToken from '~/middleware/verifyToken';

const router = Router();
router.post('/', verifyToken, ApplicantionController.applyToStore);

export default router;
