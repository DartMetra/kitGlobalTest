import { Request, Response, NextFunction } from "express";

class AuthMiddleware {
    public checkAuth(req: Request, res: Response, next: NextFunction) {}

    public isAdmin(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthMiddleware();
