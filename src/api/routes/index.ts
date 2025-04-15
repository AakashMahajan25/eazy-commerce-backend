import { Router } from 'express';
import authRoutes from '@/api/routes/auth.routes';
import productRoutes from '@/api/routes/product.routes';
import orderRoutes from '@/api/routes/order.routes';
import healthRoutes from '@/api/routes/health.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/health', healthRoutes);

export default router;