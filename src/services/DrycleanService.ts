import { IDryclean } from "../../@types/models";
import DrycleanModel from "../models/DrycleanModel";

class DrycleanService {
    public async getDrycleans(): Promise<IDryclean> {
        return await DrycleanModel.find().lean();
    }
}

export default new DrycleanService();
