"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.getAllProducts = void 0;
const product_model_1 = require("@/models/product.model");
// getAllProducts, createProduct, updateProduct, deleteProduct, 
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.ProductModel.findMany();
});
exports.getAllProducts = getAllProducts;
const createProduct = (name, slug, description, price, stock, categoryId, images) => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.ProductModel.create({
        data: {
            name,
            slug,
            description,
            price,
            stock,
            categoryId,
            images
        }
    });
});
exports.createProduct = createProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    product_model_1.ProductModel.delete({
        where: {
            id: productId
        }
    });
});
exports.deleteProduct = deleteProduct;
