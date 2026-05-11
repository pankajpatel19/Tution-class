import { Router } from "express";
import {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controller/enquiry.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

router
  .route("/")
  .get(roleAccess("admin"), requireAuth, getAllEnquiries)
  .post(roleAccess("student", "admin"), requireAuth, submitEnquiry);
router
  .route("/:id")
  .get(roleAccess("admin", "student"), requireAuth, getEnquiryById)
  .put(roleAccess("admin"), requireAuth, updateEnquiry)
  .delete(roleAccess("admin"), requireAuth, deleteEnquiry);

export default router;
