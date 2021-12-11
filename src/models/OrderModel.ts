import { Document, Schema, model, Types } from "mongoose";

const OrderSchema = new Schema(
    {
        userId: { type: Types.ObjectId, unique: true, required: true, ref: "Users" },
        status: { type: String, default: "processing", enum: ["processing", "fulfiled", "rejected"] },
        service: { type: Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const OrderModel = model<ISession>("Orders", OrderSchema);

export default OrderModel;