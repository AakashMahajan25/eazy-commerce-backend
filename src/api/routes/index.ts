import { Router } from 'express';
import authRoutes from '@/api/routes/auth.routes';
import productRoutes from '@/api/routes/product.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);

export default router;