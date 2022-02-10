import express from "express";
import {
    addDieties,
    getDieties,
    updateDieties,
    DeleteDieties,
    getsingleRecord,
  //  DeleteDieties,
} from "../controllers/adddietiesController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();




router.route("/").post(addDieties);
router.route("/").get( getDieties);
//router.route("/profile").post(protect, updateMemberProfile);
  router
  .route("/:id")
  .get(getsingleRecord)
  .delete(DeleteDieties)
 .put(updateDieties);

 // router.route("/updatedieties").post(protect, updateDieties);



export default router;
