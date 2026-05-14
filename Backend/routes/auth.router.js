import { Router } from "express";
import { authService } from "../services/authService.js";

const router = Router();
router.post("/register", authService.register);
router.post("/login", authService.login);
export default router;
