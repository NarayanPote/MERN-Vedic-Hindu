import express from "express";
import {
    addPilgrimage,
    getPilgrimage,
    getsingleRecord,
    updatePilgrimage,
    DeletePilgrimage,
  
} from "../controllers/addpilgrimageController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();








router.route("/").post(addPilgrimage);
router.route("/").get( getPilgrimage);
router
.route("/:id")
.get(getsingleRecord)
.delete(DeletePilgrimage)
.put(updatePilgrimage);


 export default router;
