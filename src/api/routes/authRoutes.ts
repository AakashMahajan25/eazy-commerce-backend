import { Router } from "express";
import * as authController from '@/api/controllers/authController';
import { authMiddleware } from "@/middlewares/authMiddleware";

const router: Router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authMiddleware, authController.logout);

export default router;