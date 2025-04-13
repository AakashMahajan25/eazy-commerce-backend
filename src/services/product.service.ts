import { ProductModel } from "@/models/product.model";

// getAllProducts, createProduct, updateProduct, deleteProduct, 

export const getAllProducts = async () => {
    return ProductModel.findMany();
};


export const getOneProduct = async (productId: number) => {
    return ProductModel.findUnique({
        where: {
            id: productId
        }
})};


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
    return ProductModel.delete({
        where: {
            id: productId
        }
    })
};

export const updateProduct = async (productId: number, data: productUpdateData) => {
    return ProductModel.update({
        where: {
            id: productId
        },
        data
    })
}



