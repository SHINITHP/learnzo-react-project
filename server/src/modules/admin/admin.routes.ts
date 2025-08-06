import { Router } from 'express';
import { refreshToken, signInAdmin } from './admin.controller';
import { uploadthingRouter } from '../../utils/uploadthings';
const router = Router();

router.post('/sign-in', signInAdmin)
router.get('/refresh-token', refreshToken);

export default router;