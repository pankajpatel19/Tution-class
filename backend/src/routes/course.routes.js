import { Router } from "express";
import {
  deleteCourse,
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controller/course.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";

const router = Router();

// create course
router.post("/create", roleAccess("admin"), createCourse);
// get all courses
router.get("/", roleAccess("admin", "student"), getAllCourses);
// get course by id
router
  .route("/:id")
  .get(roleAccess("admin", "student"), getCourseById)
  .put(roleAccess("admin"), updateCourse)
  .delete(roleAccess("admin"), deleteCourse);

export default router;
