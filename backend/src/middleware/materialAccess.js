import Material from "../models/material.model.js";
import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

export const materialAccess = asyncWrapper(async (req, res, next) => {
  const { materialId } = req.params;
  const { role } = req.user;
  if (role === "admin" || role === "teacher") {
    return next();
  }
  const material = await Material.findById(materialId);

  if (!material) {
    throw new ApiError("Material not found", 404);
  }

  const course = await Course.findById(material.course);
  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  const isStudentEnrolled = await Student.findOne({
    user: req.user.id,
    enrolledCourses: course._id,
  });

  if (!isStudentEnrolled) {
    throw new ApiError("You are not enrolled in this course", 403);
  }

  next();
});
