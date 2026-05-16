import { Router } from "express";
import authRoutes from "./auth.router.js";
import userRoutes from "./user.router.js";
import {foodDataRoutes} from "./foodData.router.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/food", foodDataRoutes);

export default router;
