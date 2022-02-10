import asyncHandler from "express-async-handler";
import Club from "../models/clubModel.js";
import generateToken from "../utils/generateToken.js";
import ObjectId  from 'mongodb';
import mongoose from 'mongoose';


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authClub = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Club.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      address: user.address,
      country: user.country,
      state: user.state,
      city: user.city,
      pincode: user.pincode,
      contactpersonname: user.contactpersonname,
      contactpersonnumber: user.contactpersonnumber,
      email: user.email,
      website: user.website,
      clubregistrationnumber: user.clubregistrationnumber,
      yearofestablishment: user.yearofestablishment,
      trustformed: user.trustformed,
      aregister: user.aregister,
      gregister: user.gregister,
      password: user.password,
      confirmpassword : user.confirmpassword,
      role:user.role,
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
const registerClub = asyncHandler(async (req, res) => {
  const { name, contactpersonname, contactpersonnumber, email, password, confirmpassword, address , country, state, city, pincode, website, clubregistrationnumber, yearofestablishment, trustformed, aregister, gregister,amount  } = req.body;
 
  // if (!name || !email || !password || !address || !country || !state || !city || !pincode || !contact || !website || !clubregistrationnumber ||!yearofestabilishment || !trustformed ||!trustformed || !password || !aandgregister || !pic) {
  //   return res.status(422).json ({error : "Plz filled the field properly"});
  // }
   
  const userExists = await Club.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await Club.create({
    name, contactpersonname, contactpersonnumber, email, password, confirmpassword, address , country, state, city, pincode, website, clubregistrationnumber, yearofestablishment, trustformed, aregister, gregister,amount 
  });

  if (user) {
    res.status(201).json({
        _id: user._id,
        name: user.name,
        address: user.address,
        country: user.country,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
        contactpersonname: user.contactpersonname,
        contactpersonnumber: user.contactpersonnumber,
        email: user.email,
        website: user.website,
        clubregistrationnumber: user.clubregistrationnumber,
        yearofestablishment: user.yearofestablishment,
        trustformed: user.trustformed,
        aregister: user.aregister,
        gregister: user.gregister,
        amount: user.amount,
        password: user.password,
        confirmpassword : user.confirmpassword,
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


const UpdateNote = asyncHandler(async (req, res) => {
  const { amount,value,type,dateString } = req.body;

  const note = await Club.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (note) {
    note.amount = amount;
    note.value = value;
    note.type = type;
    dateString.type = dateString;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});




const getsingleRecord = asyncHandler(async (req, res) => {

  const note = await Club.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});




const getNotes = asyncHandler(async (req, res) => {
  Club.find( function (err, users) {
    var userMap = {};
    users.forEach(function(user) {
      //userMap[user._id] = user;
      userMap[user._id] = user;
     // console.log(user);
    });

    res.send(userMap);
  })
});


export { authClub, UpdateNote, registerClub, getNotes, getsingleRecord };
