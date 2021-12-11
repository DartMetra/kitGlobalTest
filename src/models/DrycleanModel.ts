import { Document, Schema, model, Types } from "mongoose";
import { IDryclean } from "../../@types/models";

const DrycleanSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        services: { type: [{ type: Types.ObjectId, ref: "Services" }], required: true },
        galery: { type: [String] },
        avatar: { type: String },
    },
    {
        versionKey: false,
    }
);

const DrycleanModel = model<IDryclean>("Drycleaners", DrycleanSchema);

export default DrycleanModel;
