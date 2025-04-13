import { Router } from "express";
import * as productControllers from "@/api/controllers/product.controller";

const router: Router = Router();

router.get('/get-all-products', productControllers.allProducts);

export default router;