import express from 'express';
import { getCategories } from './category.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, getCategories);

export default router;