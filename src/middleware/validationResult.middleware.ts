import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError";

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.mapped()));
    } else {
        next();
    }
};
