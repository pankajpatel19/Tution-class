import express from "express";
import {
  changePassword,
  login,
  logout,
  me,
  register,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", me);
router.post("/change-password", changePassword);

export default router;
