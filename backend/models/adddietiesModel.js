import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const adddietiesSchema = mongoose.Schema(
    {
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
          img: {
           data: Buffer,
           contentType: String
         },
         status: {
          type: String,
          default: 'active',
        },
      },
);

// adddietiesSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // will encrypt password everytime its saved
// adddietiesSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const AddDieties = mongoose.model("AddDieties", adddietiesSchema);

export default AddDieties;
