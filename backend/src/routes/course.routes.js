import { Router } from "express";
import {
  deleteCourse,
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controller/course.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// create course
router.post("/create", roleAccess("admin"), requireAuth, createCourse);
// get all courses
router.get("/", roleAccess("admin", "student"), getAllCourses);
// get course by id
router
  .route("/:id")
  .get(roleAccess("admin", "student"), requireAuth, getCourseById)
  .put(roleAccess("admin"), requireAuth, updateCourse)
  .delete(roleAccess("admin"), requireAuth, deleteCourse);

export default router;
