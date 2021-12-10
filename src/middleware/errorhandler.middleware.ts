import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/ApiError";

export default (error: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message, errors: error.errors });
    } else {
        return res.status(500).json({ message: "Unexpected error" });
    }
};
