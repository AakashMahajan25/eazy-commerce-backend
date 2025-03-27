import { Router } from 'express';
import authRoutes from '@/api/routes/authRoutes'

const router = Router();

router.use('/auth', authRoutes);

export default router;