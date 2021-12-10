require("dotenv").config();
//require("./@types/enviroment");
/*
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DB_URI: string;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
        }
    }
}*/
import app from "./app";
import http from "http";
import mongoose from "mongoose";
import ProcessEnvValidator from "./utils/ProcessEnvValidator";
const server = http.createServer(app);
ProcessEnvValidator.validate();

const PORT: string = process.env.PORT as string;
const DB_URI: string = process.env.DB_URI as string;
const JWT_ACCESS = process.env.JWT_ACCESS_SECRET;
async function run() {
    try {
        await mongoose.connect(DB_URI);
        server.listen(PORT);
        console.log(`Listening port ${PORT}`);
    } catch (e) {
        console.error(e);
    }
}

run();
