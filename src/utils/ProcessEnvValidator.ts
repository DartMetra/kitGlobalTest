class ProcessEnvValidator {
    public validate() {
        const env = process.env;

        if (!env.PORT) {
            console.log("process.env.PORT missing!");
            return;
        }
        if (!env.DB_URI) {
            console.log("process.env.DB_URI missing!");
            return;
        }
        if (!env.JWT_ACCESS_SECRET) {
            console.log("process.env.JWT_ACCESS_SECRET missing!");
            return;
        }
        if (!env.JWT_REFRESH_SECRET) {
            console.log("process.env.JWT_REFRESH_SECRET missing!");
            return;
        }
        if (!env.SMTP_HOST) {
            console.log("process.env.SMTP_HOST missing!");
            return;
        }
        if (!env.SMTP_PORT) {
            console.log("process.env.SMTP_PORT missing!");
            return;
        }
        if (!env.SMTP_USER) {
            console.log("process.env.SMTP_USER missing!");
            return;
        }
        if (!env.SMTP_PASSWORD) {
            console.log("process.env.SMTP_PASSWORD missing!");
            return;
        }

        console.log("process.env params are set");
    }
}
export default new ProcessEnvValidator();
