import express from 'express';
import { registerCompany } from '../controllers/adminController';
import { authMiddleware } from '../middlewares/auth';
import { validateRegisterInput } from '../middlewares/validators/userValidator';
import { successResponse } from '../config/response';
import { testReqBody } from '../middlewares/testReqBody';

const router = express.Router();

router.post('/companies/invite', registerCompany);


export default router;
