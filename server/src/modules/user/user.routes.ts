import { Router } from 'express';
import { refreshToken, signInUser, signUpUser, verify } from './user.controller';
const router = Router();

router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser)
router.post('/verify-otp', verify)
router.post('/refreshToken', refreshToken);


export default router;