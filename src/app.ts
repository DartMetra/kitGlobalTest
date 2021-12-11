import express from "express";

import cors from "cors";

import apiRouter from "./router/ApiRouter";
import authRouter from "./router/AuthRouter";
import errorhandlerMiddleware from "./middleware/errorhandler.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);
app.use(authRouter);

app.use(errorhandlerMiddleware);

export default app;
