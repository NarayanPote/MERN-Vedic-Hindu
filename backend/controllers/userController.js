import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      confirmpassword : user.confirmpassword, 
      phone : user.phone, 
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword, phone  } = req.body;
 
  // if (!name || !email || !password || !address || !country || !state || !city || !pincode || !contact || !website || !clubregistrationnumber ||!yearofestabilishment || !trustformed ||!trustformed || !password || !aandgregister || !pic) {
  //   return res.status(422).json ({error : "Plz filled the field properly"});
  // }
   
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstname, lastname, email, password, confirmpassword, phone 
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      confirmpassword : user.confirmpassword, 
      phone : user.phone, 
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.name || user.firstname;
    user.lastname = req.body.name || user.lastname;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.confirmpassword = req.body.confirmpassword || user.confirmpassword;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      password: updatedUser.password,
      confirmpassword : updatedUser.confirmpassword, 
      phone : updatedUser.phone,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});



export { authUser, updateUserProfile, registerUser };
