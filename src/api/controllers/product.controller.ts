import { Request, Response } from "express";
import * as productService from "@/services/product.service"

export const allProducts = async (req: Request, res: Response) => {
    const data = await productService.getAllProducts();
    res.json({data});
}