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
        photo: {
            type: Buffer,
          },
      },
);

addcategoriesSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.addcategory;
  return result;
};



const AddCategory = mongoose.model("AddCategory", addcategoriesSchema);

export default AddCategory;


