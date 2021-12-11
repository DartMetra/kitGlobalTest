import { Document, Schema, model, Types } from "mongoose";
import { ICleaner } from "../../@types/models";

const CleanerSchema = new Schema(
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

const CleanerModel = model<ICleaner>("Cleaners", CleanerSchema);

export default CleanerModel;
