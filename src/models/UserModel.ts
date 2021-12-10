import { Document, Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { required: true, unique: true, type: String },
    FIO: { required: true, type: String },
    passwordHash: { required: true, type: String },
    isAdmin: { type: Boolean, default: false },
    updatePassId: { type: String },
    money: { type: Number, default: Math.round(Math.random() * 500) },
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
