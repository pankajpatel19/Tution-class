import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/token.js";
import { env } from "../utils/env.js";

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError("Invalid password", 401);
  }

  const token = generateToken({ id: user._id, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      name: user.name,
      role: user.role,
    },
  });
});

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError("Name, email, and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError("User already exists", 400);
  }

  const newUser = await User.create({ name, email, password, role });

  const token = generateToken({ id: newUser._id, role: newUser.role });

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      name: newUser.name,
      role: newUser.role,
    },
  });
});

export const logout = asyncWrapper(async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const me = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
});

export const changePassword = asyncWrapper(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError("Old and new passwords are required", 400);
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError("Invalid old password", 401);
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
