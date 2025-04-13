import { Request, Response } from "express";
import * as productService from "@/services/product.service"
import { CREATED, OK } from "@/config/http";

export const allProducts = async (req: Request, res: Response) => {
    const data = await productService.getAllProducts();
    res.status(OK).json({data});
}

export const oneProduct = async (req: Request, res: Response) => {
    const { productId } = req.body;
    const data = await productService.getOneProduct(productId);
    res.status(OK).json({data})
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
    await productService.deleteProduct(productId);
    res.status(OK).json({"message": "Product Deleted Successfully!"});
}

export const updateProduct = async (req: Request, res: Response) => {
    const { productId, data } = req.body;
    await productService.updateProduct(productId, data);
    res.status(OK).json({"message": "Product Updated Successfully!"})
}