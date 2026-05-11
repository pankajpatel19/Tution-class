import { Router } from "express";
import {
  addFees,
  getFees,
  getFeesById,
  updateFees,
  deleteFees,
} from "../controller/fees.controller.js";
const router = Router();

router.route("/add").post(addFees);
router.route("/:id").get(getFeesById).put(updateFees).delete(deleteFees);

router.route("/get").get(getFees);

export default router;
