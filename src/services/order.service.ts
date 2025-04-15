import { OrderModel } from "@/models/order.model";
import { OrderItem, OrderStatus } from "@/types/order.types"

export const createOrder = async (userId: number, items: OrderItem[], totalAmount: number, status: OrderStatus, addressId: number) => {
    return OrderModel.create({
        data: {
            userId,
            items: {
                create: items.map(item => ({
                    productId: item.productId!,
                    quantity: item.quantity!,
                    price: item.price!,
                }))
            },
            totalAmount,
            status,
            addressId
        }
    })
}