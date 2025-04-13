import { ProductModel } from "@/models/product.model";

// getAllProducts, createProduct, updateProduct, deleteProduct, 

export const getAllProducts = async () => {
    return ProductModel.findMany();
};

export const createProduct = async (name: string, slug: string, description: string, price: number, stock: number, categoryId: number, images?: string[]) => {
    return ProductModel.create({
        data: {
            name,
            slug,
            description,
            price,
            stock,
            categoryId,
            images
        }
    })
};

export const deleteProduct = async (productId: number) => {
    ProductModel.delete({
        where: {
            id: productId
        }
    })
};



