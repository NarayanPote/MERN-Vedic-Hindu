import express from "express";
import {
  authAdmin,
  getNotes,
  CreateAdmin,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.route("/").post(registerAdmin);
router.post("/login", authAdmin);
router.route("/").get( getNotes);
router.route("/create").post(protect, CreateAdmin);
// router.route("/profile").post(protect, updateAdminProfile);

export default router;