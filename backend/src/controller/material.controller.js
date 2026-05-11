import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import Material from "../models/material.model.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../utils/env.js";

export const uploadMaterial = asyncWrapper(async (req, res) => {
  const { courseId, title, description } = req.body;
  const file = req.file;

  if (!courseId || !title || !description || !file) {
    throw new ApiError("All fields are required", 400);
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: env.CLOUDINARY_FOLDER,
    resource_type: "auto",
  });

  const material = await Material.create({
    course: courseId,
    title,
    description,
    material: result.secure_url,
    fileType: file.mimetype,
    uploadedBy: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Material uploaded successfully",
    material,
  });
});

export const getMateralByCourse = asyncWrapper(async (req, res) => {
  const { courseId } = req.params;
  const material = await Material.find({ course: courseId }).populate(
    "uploadedBy",
    "name",
  );
  return res.status(200).json({
    success: true,
    message: "Material fetched successfully",
    material,
  });
});

export const deleteMaterial = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const material = await Material.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true },
  );
  if (!material) {
    throw new ApiError("Material not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Material deleted successfully",
    material,
  });
});
export const getAllMaterials = asyncWrapper(async (req, res) => {
  const materials = await Material.find().populate("uploadedBy", "name");
  return res.status(200).json({
    success: true,
    message: "Materials fetched successfully",
    materials,
  });
});
