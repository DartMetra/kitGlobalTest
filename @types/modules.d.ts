declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        DB_URI: string;
        JWT_ACCESS_SECRET: string;
        JWT_REFRESH_SECRET: string;
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USER: string;
        SMTP_PASSWORD: string;
    }
}

declare namespace Express {
    export interface Request {
        user: IDecodedAccessToken;
    }
}
