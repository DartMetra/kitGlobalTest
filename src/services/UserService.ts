import ApiError from "../exceptions/ApiError";
import UserModel from "../models/UserModel";
import { IUser } from "../../@types/models";
import bcrypt from "bcrypt";

class UserService {
    public async deleteById(id: string) {
        await UserModel.deleteOne({ _id: id });
    }

    public async getMoney(id: string) {
        return await UserModel.findById(id).select("money");
    }
    public async setMoney(id: string, money: number) {
        await UserModel.updateOne({ _id: id }, { money });
    }

    public async getClients(): Promise<IUser[]> {
        return await UserModel.find({ isAdmin: false }, ["_id", "email", "fio", "money"]).lean();
    }

    public async findUserByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email });
    }
    public async registerUser(email: string, fio: string, password: string) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest("Этот email занят");
        }

        const passwordHash = await bcrypt.hash(password, 5);

        const user = await UserModel.create({ email, fio, passwordHash });
        return user;
    }
    public async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден");
        }

        const isPassCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPassCorrect) {
            throw ApiError.BadRequest("Неверный пароль");
        }
        return user;
    }
    public async savePasswordRecoveryLink(email: string, updatePassId: string): Promise<void> {
        await UserModel.findOneAndUpdate({ email }, { updatePassId });
    }

    public async updatePassword(email: string, updatePassId: string, password: string): Promise<void> {
        const passwordHash = await bcrypt.hash(password, 5);
        await UserModel.findOneAndUpdate({ email, updatePassId }, { passwordHash, $unset: { updatePassId } });
    }
}

export default new UserService();
