import { Router } from "express";
import {
  addFees,
  getFees,
  getFeesById,
  updateFees,
  deleteFees,
} from "../controller/fees.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

router.post("/add", roleAccess("admin"), requireAuth, addFees);
router
  .route("/:id")
  .get(roleAccess("admin", "student"), requireAuth, getFeesById)
  .put(roleAccess("admin"), requireAuth, updateFees)
  .delete(roleAccess("admin"), requireAuth, deleteFees);

router.get("/get", roleAccess("admin", "student"), requireAuth, getFees);

export default router;
