import { Document, Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: { required: true, unique: true, type: String },
        FIO: { required: true, type: String },
        passwordHash: { required: true, type: String },
        isAdmin: { type: Boolean, default: false },
        updatePassId: { type: String, unique: true },
        money: { type: Number, default: Math.round(Math.random() * 500) },
    },
    {
        versionKey: false,
    }
);

const UserModel = model<IUser>("Users", UserSchema);

export default UserModel;
