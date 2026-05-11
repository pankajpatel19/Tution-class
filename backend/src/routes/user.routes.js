import express from "express";
import {
  changePassword,
  login,
  logout,
  me,
  register,
} from "../controller/user.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.post("/change-password", requireAuth, changePassword);

export default router;
