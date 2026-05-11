import { Router } from "express";
import {
  uploadMaterial,
  getAllMaterials,
  getMateralByCourse,
  deleteMaterial,
} from "../controller/material.controller.js";
import { materialAccess } from "../middleware/materialAccess.js";
import { roleAccess } from "../middleware/roleAccess.js";
import { upload } from "../config/cloudinary.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router
  .route("/")
  .post(
    roleAccess("admin "),
    upload.single("material"),
    requireAuth,
    uploadMaterial,
  )
  .get(getAllMaterials);
router
  .route("/:id")
  .get(materialAccess, getMateralByCourse)
  .put(roleAccess("admin"), deleteMaterial);

export default router;
