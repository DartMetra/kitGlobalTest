import OrderModel from "../models/OrderModel";
import { IOrder } from "../../@types/models";

class OrderService {
    public async getOrders(): Promise<IOrder[]> {
        return await OrderModel.find().lean();
    }
}

export default new OrderService();
