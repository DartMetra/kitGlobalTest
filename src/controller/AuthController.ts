import { Request, Response, NextFunction } from "express";
import { IUser } from "../../@types/models";
import ApiError from "../exceptions/ApiError";
import MailService from "../services/MailService";
import SessionService from "../services/SessionService";
import TokenService from "../services/TokenService";
import UserService from "../services/UserService";
import { v4 } from "uuid";

class AuthController {
    public async registerUser(req: Request, res: Response, next: NextFunction) {
        const password = req.body.password;
        const email = req.body.email;
        const fio = req.body.fio;
        try {
            const user: IUser = await UserService.registerUser(email, fio, password);
            const userId = user._id;
            const accessToken = TokenService.generateAccessToken(userId, email, fio);
            const refreshToken = TokenService.generateRefreshToken(email);
            await SessionService.saveSession(user._id, refreshToken);
            res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 /*30 days*/, httpOnly: true });
            return res.json({
                accessToken,
                refreshToken,
            });
        } catch (e) {
            next(e);
        }
    }
    public async login(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email as string;
        const password = req.body.password as string;

        try {
            const user: IUser = await UserService.login(email, password);
            const accessToken = TokenService.generateAccessToken(user._id, user.email, user.fio);
            const refreshToken = TokenService.generateRefreshToken(email);
            await SessionService.saveSession(user._id, refreshToken);
            res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({
                accessToken,
                refreshToken,
            });
        } catch (e) {
            next(e);
        }
    }
    public async refreshSession(req: Request, res: Response, next: NextFunction) {
        const refreshToken = req.cookies.refreshToken as string;

        if (!refreshToken) {
            next(ApiError.Unauthorized());
        }

        try {
            const decodedRT = TokenService.verifyRefreshToken(refreshToken);
            if (!decodedRT) {
                return next(ApiError.BadRequest("Ваш токен невалидный"));
            }
            const user = await UserService.findUserByEmail(decodedRT.email);

            if (!user) {
                return next(ApiError.BadRequest("Такого пользователя больше не существует"));
            }
            const newRefreshToken = TokenService.generateRefreshToken(user.email);
            const newAccessToken = TokenService.generateAccessToken(user._id, user.email, user.fio, user.isAdmin);
            await SessionService.saveSession(user._id, newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (e) {
            next(e);
        }
    }
    public async logout(req: Request, res: Response, next: NextFunction) {
        const refreshToken = req.cookies.refreshToken as string;
        if (refreshToken) {
            await SessionService.removeSession(refreshToken);
            res.clearCookie("refreshToken");
        }
        res.sendStatus(204);
    }
    public async sendPasswordRecoveryEmail(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const updatePassId = v4();
        await UserService.savePasswordRecoveryLink(email, updatePassId);
        await MailService.sendChangePasswordMail(email, updatePassId);
        res.sendStatus(200);
    }
    public async updatePassword(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.password;
        const updatePassId = req.params.updatePassId;
        try {
            await UserService.updatePassword(email, updatePassId, password);
            await SessionService.logoutMany(email);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}
export default new AuthController();
