import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const addcategoriesSchema = mongoose.Schema(
    {
        categorynameinenglish: {
            type: String,
            required: true,
          },
          categorynameinhindi: {
            type: String, 
            required: true,
          },
      },
);

const AddCategory = mongoose.model("AddCategory", addcategoriesSchema);

export default AddCategory;
