import { Router } from 'express';
import authRoutes from '@/api/routes/auth.routes';
import productRoutes from '@/api/routes/product.routes';
import redisRoutes from '@/api/routes/redis.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/redis', redisRoutes);

export default router;