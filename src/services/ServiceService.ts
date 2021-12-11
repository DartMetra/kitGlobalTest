import ServiceModel from "../models/ServiceModel";
import { IService } from "../../@types/models";

class ServiceService {
    public async getServices(): Promise<IService[]> {
        return await ServiceModel.find().lean();
    }
    public async addService() {}
}

export default new ServiceService();
