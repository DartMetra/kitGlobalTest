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
export type file = { fieldname: string; originalname: string; encoding: string; mimetype: string; destination: string; filename: string; path: string; size: number };
export interface IFiles {
    avatar: [file];
    gallery: [file];
}
declare namespace Express {
    export interface Request {
        user: IDecodedAccessToken;
        files: IFiles;
    }
}
