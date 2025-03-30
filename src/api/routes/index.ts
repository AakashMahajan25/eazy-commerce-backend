import { Router } from 'express';
import authRoutes from '@/api/routes/auth.routes'

const router = Router();

router.use('/auth', authRoutes);

export default router;