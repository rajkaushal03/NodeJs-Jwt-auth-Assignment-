import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import { profile } from '../controllers/protectedController.js';

const router = Router();
router.get('/profile', authenticate, profile);

export default router;
