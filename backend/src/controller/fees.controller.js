import { asyncWrapper } from "../middleware/AsyncWrapper.js";
import Fees from "../models/fees.model.js";
import ApiError from "../utils/ApiError.js";

export const addFees = asyncWrapper(async (req, res) => {
  const {
    subject,
    className,
    monthlyFees,
    yearlyFees,
    admissionFees,
    discount,
    note,
  } = req.body;

  if (
    !subject ||
    !className ||
    !monthlyFees ||
    !yearlyFees ||
    !admissionFees ||
    !discount ||
    !note
  ) {
    throw new ApiError("All fields are required", 400);
  }

  const fees = await Fees.create({
    subject,
    monthlyFees,
    yearlyFees,
    admissionFees,
    discount,
    note,
  });

  return res.status(201).json({
    success: true,
    message: "Fees created successfully",
    fees,
  });
});

export const getFees = asyncWrapper(async (req, res) => {
  const { subject, className } = req.query;

  const queryObj = {};

  if (subject) {
    queryObj.subject = { $regex: subject, $options: "i" };
  }

  if (className) {
    queryObj.className = { $regex: className, $options: "i" };
  }

  const fees = await Fees.find(queryObj);
  if (!fees) {
    throw new ApiError("Fees not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Fees fetched successfully",
    fees,
  });
});

export const getFeesById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Fees ID is required", 400);
  }
  const fees = await Fees.findById(id);
  if (!fees) {
    throw new ApiError("Fees not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Fees fetched successfully",
    fees,
  });
});

export const updateFees = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const {
    subject,
    className,
    monthlyFees,
    yearlyFees,
    admissionFees,
    discount,
    note,
  } = req.body;
  if (!id) {
    throw new ApiError("Fees ID is required", 400);
  }
  const fees = await Fees.findByIdAndUpdate(
    id,
    {
      subject,
      className,
      monthlyFees,
      yearlyFees,
      admissionFees,
      discount,
      note,
    },
    { new: true },
  );
  if (!fees) {
    throw new ApiError("Fees not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Fees updated successfully",
    fees,
  });
});

export const deleteFees = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Fees ID is required", 400);
  }
  const fees = await Fees.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true },
  );
  if (!fees) {
    throw new ApiError("Fees not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Fees deleted successfully",
    fees,
  });
});
