import express from "express";
import {
  login,
  logout,
  register,
  verifyOTP,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(register);
router.route("/verify-otp").post(verifyOTP);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
