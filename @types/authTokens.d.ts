export declare interface IDecodedAccessToken {
    userId: string;
    email: string;
    fio: string;
    isAdmin: boolean;
    iat?: number;
    exp?: number;
}
export declare interface IDecodedRefreshToken {
    email: string;
    iat?: number;
    exp?: number;
}
