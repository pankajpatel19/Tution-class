import { Router } from "express";
import { roleAccess } from "../middleware/roleAccess.js";
import { requireAuth } from "../middleware/auth.js";
import {
  enrollCourse,
  getAllEnrolledCourses,
  getMyProfile,
  updateMyProfile,
} from "../controller/student.controller.js";

const router = Router();

router
  .route("/profile")
  .get(requireAuth, roleAccess("student"), getMyProfile)
  .put(requireAuth, roleAccess("student"), updateMyProfile);

router.get(
  "/enrolled-courses",
  requireAuth,
  roleAccess("student"),
  getAllEnrolledCourses,
);

// enroll course
router.post(
  "/enroll/:courseId",
  requireAuth,
  roleAccess("student"),
  enrollCourse,
);

export default router;
