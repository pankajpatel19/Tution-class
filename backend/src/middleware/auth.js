import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      throw new ApiError("Unauthorized", 401);
    }
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(error.message, error.statusCode);
  }
};
