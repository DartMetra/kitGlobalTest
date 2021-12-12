import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import apiRouter from "./router/ApiRouter";
import authRouter from "./router/AuthRouter";
import errorhandlerMiddleware from "./middleware/errorhandler.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(__dirname + "/../public"));

app.use("/api", apiRouter);
app.use(authRouter);

app.use(errorhandlerMiddleware);

export default app;
