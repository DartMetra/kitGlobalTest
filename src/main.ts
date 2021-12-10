require("dotenv").config();
import app from "./app";
import http from "http";
import mongoose from "mongoose";
import ProcessEnvValidator from "./utils/ProcessEnvValidator";
const server = http.createServer(app);
ProcessEnvValidator.validate();

const PORT: string = process.env.PORT as string;
const DB_URI: string = process.env.DB_URI as string;

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
