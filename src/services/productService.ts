import { ProductModel } from "@/models/productModel";

export const getAllProducts = async () => {
    return await ProductModel.findMany();
};

export const createProduct = async (data: any) => {
    return await ProductModel.create({data});
};

