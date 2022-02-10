import express from "express";
import {
  addmember,
  getMember,
  //DeleteMember,
 // UpdateMember,
} from "../controllers/addmemberController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


router.route("/addmember").post(addmember);
// router
//   .route("/:id")
//   .delete(protect, DeleteMember)
//   .put(protect, UpdateMember);

router.route("/").get( getMember);
//router.post("/login", authClub);


  export default router;

  