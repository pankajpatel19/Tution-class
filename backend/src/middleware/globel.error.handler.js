import { env } from "../utils/env.js";

export const globelErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
    });
  } else if (!err.isOperational) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
