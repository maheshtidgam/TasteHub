import { uploadController } from "../controllers/foodDataController.js";
import { Router } from "express";
import multer from "multer";
import upload from "../middlewares/multer.js";
import { adminAuthMiddleware } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  adminAuthMiddleware,
  uploadController.addfoodData,
);

export const foodDataRoutes = router;
