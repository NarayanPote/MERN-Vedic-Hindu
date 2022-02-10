import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addpilgrimageSchema = mongoose.Schema(
    {
        pilgrimagenameinenglish: {
            type: String,
            required: true,
          },
        pilgrimagenameinhindi: {
            type: String, 
            required: true,
          },
      },
);

const AddPilgrimage = mongoose.model("AddPilgrimage", addpilgrimageSchema);

export default AddPilgrimage;
