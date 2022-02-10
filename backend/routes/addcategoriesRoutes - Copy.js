import express from "express";
import {
    addCategories,
    getCategories,
    getsingleRecord,
    updateCategories,
  
} from "../controllers/addcategoriesController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();








router.route("/").post(addCategories);
router.route("/").get( getCategories);
router
.route("/:id")
.get(getsingleRecord)
//.delete(DeleteDieties)
.put(updateCategories);


 export default router;
