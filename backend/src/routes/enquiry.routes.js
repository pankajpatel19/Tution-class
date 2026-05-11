import { Router } from "express";
import {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controller/enquiry.controller.js";
const router = Router();

router.post("/", submitEnquiry);
router
  .route("/:id")
  .get(getEnquiryById)
  .put(updateEnquiry)
  .delete(deleteEnquiry);

export default router;
