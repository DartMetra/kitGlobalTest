import { IDryclean } from "../../@types/models";
import DrycleanModel from "../models/DrycleanModel";

class DrycleanService {
    public async getDrycleans(): Promise<IDryclean> {
        return await DrycleanModel.find().lean();
    }
    public async getDryclean(id: string): Promise<IDryclean> {
        return await DrycleanModel.findById(id).lean();
    }
    public async createDryclean(p: Partial<IDryclean>): Promise<void> {
        await DrycleanModel.create({ name: p.name, description: p.description, services: p.services, gallery: p.gallery, avatar: p.avatar });
    }
}

export default new DrycleanService();
