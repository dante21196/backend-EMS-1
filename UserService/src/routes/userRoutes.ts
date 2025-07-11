import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';
import { validateRegisterInput } from '../middlewares/validators/userValidator';
import { successResponse } from '../config/response';
import { testReqBody } from '../middlewares/testReqBody';

const router = express.Router();

router.post('/register',validateRegisterInput, registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.get('/',testReqBody,loginUser)

export default router;
