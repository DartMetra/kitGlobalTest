import ServiceModel from "../models/ServiceModel";
import { IService } from "../../@types/models";

class ServiceService {
    public async deleteById(id: string) {
        await ServiceModel.deleteOne({ _id: id });
    }

    public async getServices(): Promise<IService[]> {
        return await ServiceModel.find().lean();
    }
    public async createService(name: string, cost: number): Promise<void> {
        await ServiceModel.create({ name, cost });
    }
    public async getCost(id: string) {
        return await ServiceModel.findById(id).select("cost").lean();
    }
    public async updateService(id: string, p: { cost?: number; name?: string }) {
        await ServiceModel.updateOne({ _id: id }, { name: p.name, cost: p.cost });
    }
}

export default new ServiceService();
