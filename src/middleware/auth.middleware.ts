import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/ApiError";
import TokenService from "../services/TokenService";
import { IDecodedAccessToken } from "../../@types/authTokens";

class AuthMiddleware {
    public checkAuth(req: Request, res: Response, next: NextFunction) {
        const authHeader: string = req.headers.authorization as string;
        if (!authHeader) {
            next(ApiError.Unauthorized());
            return;
        }
        const accessToken: string = authHeader.split(" ")[1];
        if (!accessToken) {
            next(ApiError.Unauthorized());
            return;
        }

        const tokenData = TokenService.verifyAccessToken(accessToken);
        req.user = tokenData as IDecodedAccessToken;
        next();
    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        if (!req.user.isAdmin) {
            next(ApiError.Forbidden());
        }
        next();
    }
}

export default new AuthMiddleware();
