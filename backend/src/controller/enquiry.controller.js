import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import Enquiry from "../models/enquiry.model.js";

export const submitEnquiry = asyncWrapper(async (req, res) => {
  const { name, email, phone, message, className, subject, course } = req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !message ||
    !className ||
    !subject ||
    !course
  ) {
    throw new ApiError("All fields are required", 400);
  }
  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    message,
    className,
    subject,
    course,
  });
  return res.status(201).json({
    success: true,
    message: "Thank you for your enquiry, we will get back to you soon",
    enquiry,
  });
});

// get all enquiries
export const getAllEnquiries = asyncWrapper(async (req, res) => {
  const enquiries = await Enquiry.find();
  return res.status(200).json({
    success: true,
    message: "Enquiries fetched successfully",
    enquiries,
  });
});

// get enquiry by id
export const getEnquiryById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Enquiry ID is required", 400);
  }
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw new ApiError("Enquiry not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Enquiry fetched successfully",
    enquiry,
  });
});

// update enquiry
export const updateEnquiry = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, message, className, subject, course, status } =
    req.body;
  if (!id) {
    throw new ApiError("Enquiry ID is required", 400);
  }
  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      message,
      className,
      subject,
      course,
      status,
    },
    { new: true },
  );
  if (!enquiry) {
    throw new ApiError("Enquiry not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Enquiry updated successfully",
    enquiry,
  });
});

// delete enquiry
export const deleteEnquiry = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Enquiry ID is required", 400);
  }
  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true },
  );
  if (!enquiry) {
    throw new ApiError("Enquiry not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Enquiry deleted successfully",
    enquiry,
  });
});
