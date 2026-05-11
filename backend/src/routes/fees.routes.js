import { Router } from "express";
import {
  addFees,
  getFees,
  getFeesById,
  updateFees,
  deleteFees,
} from "../controller/fees.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
const router = Router();

router.post("/add", roleAccess("admin"), addFees);
router
  .route("/:id")
  .get(roleAccess("admin", "student"), getFeesById)
  .put(roleAccess("admin"), updateFees)
  .delete(roleAccess("admin"), deleteFees);

router.get("/get", roleAccess("admin", "student"), getFees);

export default router;
