import { ProductModel } from "@/models/product.model";

export const getAllProducts = async () => {
    return await ProductModel.findMany();
};

export const createProduct = async (name: string, slug: string, description: string, price: number, stock: number, categoryId: number, category: string, images?: string[]) => {

};

