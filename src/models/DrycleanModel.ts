import { Document, Schema, model, Types } from "mongoose";
import { IDryclean } from "../../@types/models";

const DrycleanSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        services: [{ type: Types.ObjectId, ref: "Services" }],
        gallery: [String],
        avatar: { type: String },
    },
    {
        versionKey: false,
    }
);

const DrycleanModel = model<IDryclean>("Drycleans", DrycleanSchema);

export default DrycleanModel;
