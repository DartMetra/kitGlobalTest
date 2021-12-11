import { Document } from "mongoose";

declare interface IUser extends Document {
    email: string;
    fio: string;
    passwordHash: string;
    isAdmin: boolean;
    updatePassId: string;
    money: number;
}

declare interface ISession extends Document {
    userId: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

declare interface IOrder extends Document {
    userId: string;
    status: "processing" | "fulfiled" | "rejected";
    service: string;
    createdAt: Date;
    updatedAt: Date;
}

declare interface ICleaner extends Document {
    name: string;
    description?: string;
    services: string[];
    galery?: string[];
    avatar?: string;
}

declare interface IService extends Document {
    name: string;
    cost: number;
}
