import { exit } from "process";

class ProcessEnvValidator {
    public validate() {
        const env = process.env;

        if (!env.PORT) {
            console.error("process.env.PORT missing!");
            return exit;
        }
        if (!env.DB_URI) {
            console.error("process.env.DB_URI missing!");
            return exit;
        }
        if (!env.JWT_ACCESS_SECRET) {
            console.error("process.env.JWT_ACCESS_SECRET missing!");
            return exit;
        }
        if (!env.JWT_REFRESH_SECRET) {
            console.error("process.env.JWT_REFRESH_SECRET missing!");
            return exit;
        }
        if (!env.SMTP_HOST) {
            console.error("process.env.SMTP_HOST missing!");
            return exit;
        }
        if (!env.SMTP_PORT) {
            console.error("process.env.SMTP_PORT missing!");
            return exit;
        }
        if (!env.SMTP_USER) {
            console.error("process.env.SMTP_USER missing!");
            return exit;
        }
        if (!env.SMTP_PASSWORD) {
            console.error("process.env.SMTP_PASSWORD missing!");
            return exit;
        }
        console.log("process.env params are set");
    }
}
export default new ProcessEnvValidator();
