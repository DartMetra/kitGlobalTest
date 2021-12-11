import { Document, Schema, model, Types } from "mongoose";
import { IService } from "../../@types/models";

const ServiceSchema = new Schema(
    {
        name: { type: String, required: true },
        cost: { type: Number, required: true, min: [0, "Too cheap"], max: [500, "Too expensive"] },
    },
    {
        versionKey: false,
    }
);

const ServiceModel = model<IService>("Services", ServiceSchema);

export default ServiceModel;
