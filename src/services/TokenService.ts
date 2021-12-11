import jwt from "jsonwebtoken";
import { IDecodedRefreshToken, IDecodedAccessToken } from "../../@types/authTokens";

class TokenService {
    public generateAccessToken(userId: string, email: string, fio: string, isAdmin: boolean = false): string {
        return jwt.sign({ userId, email, fio, isAdmin }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "15m" });
    }
    public generateRefreshToken(email: string): string {
        return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "30d" });
    }
    public verifyAccessToken(token: string): IDecodedAccessToken | null {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as IDecodedAccessToken;
            return tokenData;
        } catch (e) {
            return null;
        }
    }
    public verifyRefreshToken(token: string): IDecodedRefreshToken | null {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as IDecodedRefreshToken;
            return tokenData;
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();
