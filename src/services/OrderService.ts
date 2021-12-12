import OrderModel from "../models/OrderModel";
import { IOrder } from "../../@types/models";

class OrderService {
    public async getOrders(): Promise<IOrder[]> {
        return await OrderModel.find().lean();
    }
    public async getOrder(id: string): Promise<IOrder> {
        return await OrderModel.findById(id).lean();
    }
}

export default new OrderService();
