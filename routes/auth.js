import { Router } from 'express';
import { signup } from '../controllers/authSignupController.js';
import { login } from '../controllers/authLoginController.js';
import { verifyOtp } from '../controllers/authVerifyOtpController.js';
import { refreshToken } from '../controllers/authRefreshTokenController.js';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/refresh-token', refreshToken);

export default router;
