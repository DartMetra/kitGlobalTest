import mailer from "nodemailer";

class MailService {
    private transporter;
    private readonly baseUrl = ((process.env.BASE_URL as string) + ":" + process.env.PORT) as string;
    constructor() {
        this.transporter = mailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.SMTP_USER as string,
                pass: process.env.SMTP_PASSWORD as string,
            },
        });
    }

    public async sendChangePasswordMail(to: string, updatePassId: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER as string,
            to,
            subject: "Смена пароля",
            html: `
            <div>
                <p>
                    Для вашего аккаунта была запрошена смена пароля
                </p>
                <h1>
                    <a href="${this.baseUrl}/updatepassword/${updatePassId}">${this.baseUrl}/updatepassword/${updatePassId}</a>
                </h1>
            </div>
            `,
        });
    }
}

export default new MailService();
