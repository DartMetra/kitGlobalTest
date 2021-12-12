import { IDryclean, IService } from "../../@types/models";
import DrycleanModel from "../models/DrycleanModel";
import ServiceModel from "../models/ServiceModel";

class DrycleanService {
    public async deleteById(id: string) {
        await DrycleanModel.deleteOne({ _id: id });
    }
    public async getDrycleans(): Promise<IDryclean> {
        return await DrycleanModel.find().populate<{ services: IService[] }>("services").lean();
    }
    public async getDryclean(id: string) {
        return await DrycleanModel.findById(id).populate<{ services: IService[] }>("services").lean();
    }
    public async createDryclean(p: Partial<IDryclean>): Promise<void> {
        await DrycleanModel.create({ name: p.name, description: p.description, services: p.services, gallery: p.gallery, avatar: p.avatar });
    }
}

export default new DrycleanService();
