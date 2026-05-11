import { Router } from "express";
import {
  deleteCourse,
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controller/course.controller.js";

const router = Router();

// create course
router.post("/create", createCourse);
// get all courses
router.get("/", getAllCourses);
// get course by id
router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);

export default router;
