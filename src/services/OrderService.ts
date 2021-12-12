import OrderModel from "../models/OrderModel";
import { IOrder, IService, IUser } from "../../@types/models";

class OrderService {
    public async deleteById(id: string) {
        await OrderModel.deleteOne({ _id: id });
    }
    public async updateStatus(id: string, status: "processing" | "fulfiled" | "rejected") {
        await OrderModel.updateOne({ _id: id }, { status });
    }

    public async getOrders(): Promise<IOrder[]> {
        return await OrderModel.find().populate<{ services: IService[]; userId: IUser }>("services users");
    }
    public async getOrder(id: string) {
        return await OrderModel.findById(id).populate<{ services: IService[]; userId: IUser }>("services users");
    }
    public async createOrder(userId: string, service: string) {
        await OrderModel.create({ userId, service });
    }
}

export default new OrderService();
