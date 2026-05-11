import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { roleAccess } from "../middleware/roleAccess.js";
import {
  approveTestimonial,
  deleteTestimonial,
  getAllApprovedTestimonials,
  getAllUnapprovedTestimonials,
  rejectTestimonial,
  submitTestimonial,
} from "../controller/testimonial.controller.js";

const router = Router();

router
  .route("/submit")
  .post(roleAccess("student"), requireAuth, submitTestimonial);
router
  .route("/approved")
  .get(roleAccess("student", "admin"), requireAuth, getAllApprovedTestimonials);
router
  .route("/unapproved")
  .get(roleAccess("admin"), requireAuth, getAllUnapprovedTestimonials);
router
  .route("/approve/:id")
  .put(roleAccess("admin"), requireAuth, approveTestimonial);
router
  .route("/reject/:id")
  .put(roleAccess("admin"), requireAuth, rejectTestimonial);
router
  .route("/delete/:id")
  .delete(roleAccess("admin"), requireAuth, deleteTestimonial);

export default router;
