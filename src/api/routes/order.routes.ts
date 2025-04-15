import { Router } from "express";
import * as orderControllers from "@/api/controllers/order.controller";

const router : Router = Router();

router.post('/create-order', orderControllers.createOrder);

export default router;