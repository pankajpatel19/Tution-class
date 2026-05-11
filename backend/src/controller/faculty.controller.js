import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import Faculty from "../models/faculty.model.js";
import ApiError from "../utils/ApiError.js";

export const createFaculty = asyncWrapper(async (req, res) => {
  const {
    name,
    subject,
    qualification,
    experience,
    biography,
    avatar,
    isAvailable,
  } = req.body;

  if (
    !name ||
    !subject ||
    !qualification ||
    !experience ||
    !biography ||
    !avatar ||
    !isAvailable
  ) {
    throw new ApiError("All fields are required", 400);
  }

  const faculty = await Faculty.create({
    name,
    subject,
    qualification,
    experience,
    biography,
    avatar,
    isAvailable,
  });

  return res.status(201).json({
    success: true,
    message: "Faculty created successfully",
    faculty,
  });
});

export const getAllFaculty = asyncWrapper(async (req, res) => {
  const { query } = req.query;

  const queryObj = {};

  if (query) {
    queryObj.name = { $regex: query, $options: "i" };
  }

  const faculties = await Faculty.find(queryObj);

  return res.status(200).json({
    success: true,
    message: "Faculties fetched successfully",
    faculties,
  });
});

export const getFacultyById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Faculty ID is required", 400);
  }
  const faculty = await Faculty.findById(id);
  if (!faculty) {
    throw new ApiError("Faculty not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Faculty fetched successfully",
    faculty,
  });
});

export const updateFaculty = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    subject,
    qualification,
    experience,
    biography,
    avatar,
    isAvailable,
  } = req.body;
  if (!id) {
    throw new ApiError("Faculty ID is required", 400);
  }
  const faculty = await Faculty.findByIdAndUpdate(
    id,
    {
      name,
      subject,
      qualification,
      experience,
      biography,
      avatar,
      isAvailable,
    },
    { new: true },
  );
  if (!faculty) {
    throw new ApiError("Faculty not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Faculty updated successfully",
    faculty,
  });
});

export const deleteFaculty = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Faculty ID is required", 400);
  }
  const faculty = await Faculty.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true },
  );
  if (!faculty) {
    throw new ApiError("Faculty not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Faculty deleted successfully",
    faculty,
  });
});
