import { Router } from 'express';
import { collectLead } from '../controllers/externalController';

const router = Router();

router.post('/collect', collectLead);

export default router;
