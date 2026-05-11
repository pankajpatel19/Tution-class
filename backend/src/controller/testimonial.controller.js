import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import Testimonial from "../models/testimonial.model.js";
import ApiError from "../utils/ApiError.js";

export const submitTestimonial = asyncWrapper(async (req, res) => {
  const { name, className, rating, review } = req.body;
  if (!name || !className || !rating || !review) {
    throw new ApiError("All fields are required", 400);
  }
  const testimonial = await Testimonial.create({
    name,
    className,
    rating,
    review,
  });
  return res.status(201).json({
    success: true,
    message: "Testimonial submitted successfully",
    testimonial,
  });
});

export const getAllApprovedTestimonials = asyncWrapper(async (req, res) => {
  const testimonials = await Testimonial.find({ isApproved: true });
  return res.status(200).json({
    success: true,
    message: "Testimonials fetched successfully",
    testimonials,
  });
});

export const getAllUnapprovedTestimonials = asyncWrapper(async (req, res) => {
  const testimonials = await Testimonial.find({ isApproved: false });
  return res.status(200).json({
    success: true,
    message: "Unapproved Testimonials fetched successfully",
    testimonials,
  });
});

export const approveTestimonial = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Testimonial ID is required", 400);
  }
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { isApproved: true, isAvailable: true },
    { new: true },
  );
  if (!testimonial) {
    throw new ApiError("Testimonial not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Testimonial approved successfully",
    testimonial,
  });
});
export const rejectTestimonial = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Testimonial ID is required", 400);
  }
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { isApproved: false, isAvailable: false },
    { new: true },
  );
  if (!testimonial) {
    throw new ApiError("Testimonial not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Testimonial rejected successfully",
    testimonial,
  });
});

export const deleteTestimonial = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Testimonial ID is required", 400);
  }
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true },
  );
  if (!testimonial) {
    throw new ApiError("Testimonial not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Testimonial deleted successfully",
    testimonial,
  });
});
