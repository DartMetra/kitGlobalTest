import { ISession } from "../../@types/models";
import SessionModel from "../models/SessionModel";
import UserModel from "../models/UserModel";

class SessionService {
    public async saveSession(userId: string, refreshToken: string): Promise<void> {
        const session = await SessionModel.findOne({ userId });
        if (session) {
            session.refreshToken = refreshToken;
            session.save();
        } else {
            await SessionModel.create({ userId, refreshToken });
        }
    }

    public async removeSession(refreshToken: string): Promise<void> {
        await SessionModel.deleteOne({ refreshToken });
    }

    public async findSession(refreshToken: string): Promise<ISession | null> {
        return await SessionModel.findOne({ refreshToken });
    }

    public async logoutMany(email: string): Promise<void> {
        const user = await UserModel.findOne({ email }).lean();
        if (user) {
            await SessionModel.deleteMany({ userId: user._id });
        }
    }
}

export default new SessionService();
