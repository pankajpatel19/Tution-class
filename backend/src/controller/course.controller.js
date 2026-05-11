import ApiError from "../utils/ApiError.js";
import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import Course from "../models/course.model.js";

export const createCourse = asyncWrapper(async (req, res) => {
  const {
    title,
    description,
    className,
    subject,
    fees,
    duration,
    schedule,
    isAvailable,
  } = req.body;

  if (
    !title ||
    !description ||
    !className ||
    !subject ||
    !fees ||
    !duration ||
    !schedule ||
    !isAvailable
  ) {
    throw new ApiError("All fields are required", 400);
  }

  const course = await Course.create({
    title,
    description,
    subject,
    fees,
    duration,
    schedule,
    isAvailable,
  });

  return res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
});

export const getAllCourses = asyncWrapper(async (req, res) => {
  const courses = await Course.find();
  return res.status(200).json({
    success: true,
    message: "Courses fetched successfully",
    courses,
  });
});

export const getCourseById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Course ID is required", 400);
  }
  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    course,
  });
});

export const updateCourse = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, description, subject, fees, duration, schedule, isAvailable } =
    req.body;
  if (!id) {
    throw new ApiError("Course ID is required", 400);
  }
  const course = await Course.findByIdAndUpdate(
    id,
    { title, description, subject, fees, duration, schedule, isAvailable },
    { new: true },
  );
  if (!course) {
    throw new ApiError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Course updated successfully",
    course,
  });
});

export const deleteCourse = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Course ID is required", 400);
  }
  const course = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true },
  );
  if (!course) {
    throw new ApiError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    course,
  });
});
