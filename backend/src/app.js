import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globelErrorHandler } from "./middleware/globel.error.handler.js";
import userRouter from "./routes/user.routes.js";
import { env } from "./utils/env.js";

const app = express();

// middleware
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// routes
app.use("/api/v1/user", userRouter);

// error handling middleware
app.use(globelErrorHandler);

export default app;
