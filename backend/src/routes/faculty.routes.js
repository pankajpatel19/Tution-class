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
router.get("/:id", getFacultyById);
// update faculty
router.put("/:id", updateFaculty);
// delete faculty
router.delete("/:id", deleteFaculty);

export default router;
