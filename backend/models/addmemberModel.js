import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addmemberSchema = mongoose.Schema(
  {
    membername: {
        type: String,
        required: true,
      },
    memberemail: {
          type: String,
          required: true,
         // unique: true,
        },
    memberphone: {
          type: String,
          required: true,
        },
    membercountry: {
        type: String,
        required: true,
      },
    memberstate: {
        type: String,
        required: true,
      },
    membercity: {
        type: String,
        required: true,
      },
  
    memberadult: {
        type: Number,
        required: true,
      },
    memberbelow: {
        type: Number,
        required: true,
        unique: true,
      },
    memberaddress: {
        type: String,
        required: true,
      } 
    },
    {
    timestamps: true,
    }
);



// addmemberSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };
  
  // will encrypt password everytime its saved
//   addmemberSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
  
  const AddMember = mongoose.model("Addmember", addmemberSchema);
  
  export default AddMember;
  
