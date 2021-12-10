import { ValidationError } from "express-validator";

type errors = Record<string, ValidationError> | string[] | string;

class ApiError extends Error {
    public status: number;
    public errors: errors;
    constructor(status: number, message: string, errors: errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static Unauthorized() {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static Forbidden() {
        return new ApiError(403, "У пользователя недостаточно прав");
    }

    static BadRequest(message: string, errors?: errors) {
        return new ApiError(400, message, errors);
    }

    static Conflict(message: string, errors: string | string[] = []) {
        return new ApiError(409, message, errors);
    }
}
export default ApiError;
