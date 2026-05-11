import { Router } from "express";
import {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controller/enquiry.controller.js";
import { roleAccess } from "../middleware/roleAccess.js";
const router = Router();

router
  .route("/")
  .get(roleAccess("admin"), getAllEnquiries)
  .post(roleAccess("student", "admin"), submitEnquiry);
router
  .route("/:id")
  .get(roleAccess("admin", "student"), getEnquiryById)
  .put(roleAccess("admin"), updateEnquiry)
  .delete(roleAccess("admin"), deleteEnquiry);

export default router;
