import { OrderModel } from "@/models/orderModel";

const createOrder = async (userId: number, { products, totalAmount}: any) => {
    return await OrderModel.create({
        data: { userId, products, totalAmount }
    })
};