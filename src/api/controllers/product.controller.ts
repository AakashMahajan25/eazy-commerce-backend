import { Request, Response } from "express";
import * as productService from "@/services/product.service"
import { CREATED, OK } from "@/config/http";

export const allProducts = async (req: Request, res: Response) => {
    const data = await productService.getAllProducts();
    res.json({data});
}

export const createProduct = async (req: Request, res: Response) => {
    const { name, slug, description, price, stock, categoryId, images } = req.body;
    await productService.createProduct(
        name, slug, description, price, stock, categoryId, images || []
    );
    res.status(CREATED).json({"message": "Product Created Successfully!"});
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { productId } = req.body;
    await productService.deleteProduct(Number(productId));
    res.status(OK).json({"message": "Product Deleted Successfully!"});
}