declare interface IUser extends Document {
    email: string;
    FIO: string;
    passwordHash: string;
    isAdmin: boolean;
    updatePassId: string;
    money: number;
}

declare interface ISession extends Document {}

declare interface IOrders extends Document {}

declare interface ICleaner extends Document {}

declare interface IServices extends Document {}
