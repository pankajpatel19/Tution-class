import { Router } from "express";
import {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../controller/faculty.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
const router = Router();

// create faculty
router.post("/create", roleAccess("admin"), createFaculty);
// get all faculty
router.get("/", roleAccess("admin", "student"), getAllFaculty);
// get faculty by id
router
  .route("/:id")
  .get(roleAccess("admin", "student"), getFacultyById)
  .put(roleAccess("admin"), updateFaculty)
  .delete(roleAccess("admin"), deleteFaculty);

export default router;
