import { Router } from "express";
import { authService } from "../services/authService.js";

const router = Router();
router.post("/register", authService.register);
router.post("/login", authService.login);
router.post("/send-otp", authService.sendOTP);
router.post("/verify-otp", authService.verifyOTP);
export default router;
