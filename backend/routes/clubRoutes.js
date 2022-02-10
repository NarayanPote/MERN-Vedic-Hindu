import express from "express";
import {
  authClub,
  registerClub,
  getNotes,
  UpdateNote,
  getsingleRecord
} from "../controllers/clubController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


router.route("/").post(registerClub);
router.post("/login", authClub);
router.route("/").get(protect, getNotes);
router
  .route("/:id")
  .get(getsingleRecord)  
  .put(UpdateNote);
  

export default router;
