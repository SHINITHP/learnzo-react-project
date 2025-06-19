import { Router } from 'express';
import { signInUser, signUpUser, verify } from './user.controller';
const router = Router();

router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser)
router.post('/verify-otp', verify)

export default router;