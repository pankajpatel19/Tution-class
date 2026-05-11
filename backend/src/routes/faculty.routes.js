import { Router } from "express";
import {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../controller/faculty.controller.js";
const router = Router();

// create faculty
router.post("/create", createFaculty);
// get all faculty
router.get("/", getAllFaculty);
// get faculty by id
router
  .route("/:id")
  .get(getFacultyById)
  .put(updateFaculty)
  .delete(deleteFaculty);

export default router;
