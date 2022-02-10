
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const TempleSchema = mongoose.Schema({


  
    templecategory: {
        type: String,
        required: true,
      },
      templepilgrimage: {
        type: String,
        required: true,
      },
      templemaindiety: {
        type: String,
        required: true,
      },
      templenameinenglish: {
        type: String,
        required: true,
      },
      templenameinhindi: {
        type: String,
        required: true,
      },
      
     photo: {
     type: String,
     required: true,
     },
     file_mimetype: {
        type: String,
        required: true,
        },
    status: {
    type: String,
    default: 'inactive',
    },

});



TempleSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.photo;
  return result;
};


const Temple = mongoose.model('Temple', TempleSchema);

export default Temple;


