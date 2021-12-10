import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError";

class AuthController {
    public async registerUser(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest("Ошибка валидации", errors.mapped()));
        }

        res.sendStatus(204);
    }
    public async login(req: Request, res: Response, next: NextFunction) {}
    public async refreshSession(req: Request, res: Response, next: NextFunction) {}
    public async logout(req: Request, res: Response, next: NextFunction) {}
}
export default new AuthController();
