import { Router } from "express";
import authRoutes from "./auth.router.js";
import userRoutes from "./user.router.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;