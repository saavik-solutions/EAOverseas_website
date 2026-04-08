import { Router } from 'express';
import { streamChat } from '../controllers/ai.controller';

const router = Router();

router.post('/chat', streamChat);

export default router;
