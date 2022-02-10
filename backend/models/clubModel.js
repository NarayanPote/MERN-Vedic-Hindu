import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const clubSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactpersonname: {
        type: String,
        required: true,
      },
    contactpersonnumber: {
        type: String,
        required: true,
      },
    address: {
      type: String,
      required: true,
    },
    
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
      },
    
    website: {
      type: String,
      required: true,
    },
    clubregistrationnumber: {
      type: Number,
      required: true,
    },
    yearofestablishment: {
      type: Number,
      required: true,
    },
    trustformed: {
      type: String,
      required: true,
    },
    aregister: {
      type: String,
      required: true,
    },
    gregister: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
       
    },
    value: {
      type: Number,
       
    }, 
    role: {
      type: String,
       
    },
    type: {
      type: String,
       
    }, 
    dateString: {
      type: Number,
       
    }, 
  },
  {
    timestamps: true,
  }
);



clubSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  clubSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  const Club = mongoose.model("Club", clubSchema);
  
  export default Club;
  
