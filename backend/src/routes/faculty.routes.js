import { Router } from "express";
import {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../controller/faculty.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

// create faculty
router.post("/create", roleAccess("admin"), requireAuth, createFaculty);
// get all faculty
router.get("/", roleAccess("admin", "student"), requireAuth, getAllFaculty);
// get faculty by id
router
  .route("/:id")
  .get(roleAccess("admin", "student"), requireAuth, getFacultyById)
  .put(roleAccess("admin"), requireAuth, updateFaculty)
  .delete(roleAccess("admin"), requireAuth, deleteFaculty);

export default router;
