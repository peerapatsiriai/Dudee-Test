import { Request, Response } from "express";
// import { OrderDTO } from '../../dto/orderInfo'
import * as orderService from "../../repository/orderRepository";

// Get All Order By Member Id
export const getAllOrderByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = (req as any).memberID; // Get memberID from middleware
        const orders = await orderService.getAllOrderByMemberId(Number(memberId));
        if(orders?.length === 0) {
            return res.status(200).json({ message: 'You dont have order ' });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
