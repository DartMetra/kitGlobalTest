import ServiceModel from "../models/ServiceModel";
import { IService } from "../../@types/models";

class ServiceService {
    public async getServices(): Promise<IService[]> {
        return await ServiceModel.find().lean();
    }
    public async createService(name: string, cost: number): Promise<void> {
        await ServiceModel.create({ name, cost });
    }
}

export default new ServiceService();
