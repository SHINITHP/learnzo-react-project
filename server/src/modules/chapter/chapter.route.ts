import express from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createChapter, updateChapter } from './chapter.controller';

const router = express.Router();

router.post('/create', authMiddleware, createChapter);
router.put('/reorder/:id', authMiddleware, updateChapter);

export default router;