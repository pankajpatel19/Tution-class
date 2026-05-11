import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getMyProfile = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("enrolledCourses", "name")
    .select("-password -isVerified -isDeleted -isAvailable");
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user,
  });
});

export const updateMyProfile = asyncWrapper(async (req, res) => {
  const { name, phone, avatar, currentClass } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.avatar = avatar || user.avatar;
  user.currentClass = currentClass || user.currentClass;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const getAllEnrolledCourses = asyncWrapper(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  if (!courseId) {
    throw new ApiError("Course ID is required", 400);
  }
  const students = await User.find({
    _id: userId,
  })
    .populate("enrolledCourses", "name")
    .select("-password -isVerified -isDeleted -isAvailable");
  return res.status(200).json({
    success: true,
    message: "Students fetched successfully",
    students,
  });
});

export const enrollCourse = asyncWrapper(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  if (!courseId) {
    throw new ApiError("Course ID is required", 400);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  user.enrolledCourses.push(courseId);
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Course enrolled successfully",
    user,
  });
});
