import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { roles } from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", authMiddleware, getAllUsers);
router.get("/roles", roles);

export default router;
