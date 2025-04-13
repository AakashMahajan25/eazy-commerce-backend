import { Router } from "express";
import * as productControllers from "@/api/controllers/product.controller";

const router: Router = Router();

router.get('/get-all-products', productControllers.allProducts);
router.post('/create-product', productControllers.createProduct);
router.delete('/delete-product', productControllers.deleteProduct);

export default router;