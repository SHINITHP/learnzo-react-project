import { Router } from 'express';
import { logout, refreshToken, signInUser, signUpUser, verify } from './user.controller';
const router = Router();

router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser)
router.post('/verify-otp', verify)
router.get('/refresh-token', refreshToken);
router.post("/logout", logout);


export default router;