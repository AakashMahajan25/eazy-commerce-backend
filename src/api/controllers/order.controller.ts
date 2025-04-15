import { Request, Response } from "express";
import * as orderService from "@/services/order.service";
import { OK } from "@/config/http";

export const createOrder = async (req: Request, res: Response) => {
    const { userId, items, totalAmount, status, addressId } = req.body;
    const data = orderService.createOrder(
        userId,
        items,
        totalAmount,
        status,
        addressId
    )
    res.status(OK).json({"message": "Order Creation Successful!",
        data
    });
}