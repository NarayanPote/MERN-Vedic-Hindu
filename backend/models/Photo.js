
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const PhotoSchema = mongoose.Schema({


  
    dietynameinenglish: {
        type: String,
        required: true,
      },
    aliasnameinenglish: {
        type: String,
        required: true,
      },
      dietynameinhindi: {
        type: String,
        required: true,
      },
      aliasnameinhindi: {
        type: String,
        required: true,
      },
      
  photo: {
    type: Buffer,
  },
  status: {
    type: String,
    default: 'active',
  },
  




});



PhotoSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.photo;
  return result;
};


const Photo = mongoose.model('AddDieties', PhotoSchema);

export default Photo;


