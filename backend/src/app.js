import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globelErrorHandler } from "./middleware/globel.error.handler.js";
import { env } from "./utils/env.js";

//routes
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";
import facultyRouter from "./routes/faculty.routes.js";
import feesRouter from "./routes/fees.routes.js";
import enquiryRouter from "./routes/enquiry.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";
import studentRouter from "./routes/student.routes.js";
import materialRouter from "./routes/material.routes.js";

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
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/fees", feesRouter);
app.use("/api/v1/enquiry", enquiryRouter);
app.use("/api/v1/testimonial", testimonialRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/material", materialRouter);

// error handling middleware
app.use(globelErrorHandler);

export default app;
