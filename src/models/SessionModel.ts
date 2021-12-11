import { Document, Schema, model, Types } from "mongoose";

const SessionSchema = new Schema(
    {
        userId: { type: Types.ObjectId, unique: true, required: true, ref: "Users" },
        refreshToken: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const SessionModel = model<ISession>("Sessions", SessionSchema);

export default SessionModel;
