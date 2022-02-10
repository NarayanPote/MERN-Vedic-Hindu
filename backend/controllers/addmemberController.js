import asyncHandler from "express-async-handler";
import AddMember from "../models/addmemberModel.js";
import generateToken from "../utils/generateToken.js";
//import ObjectId  from 'mongodb';
//import mongoose from 'mongoose';

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const addmember = asyncHandler(async (req, res) => {
  const { membername, memberemail, memberphone, membercountry, memberstate, membercity, memberadult , memberbelow, memberaddress  } = req.body;
 
  // if (!name || !email || !password || !address || !country || !state || !city || !pincode || !contact || !website || !clubregistrationnumber ||!yearofestabilishment || !trustformed ||!trustformed || !password || !aandgregister || !pic) {
  //   return res.status(422).json ({error : "Plz filled the field properly"});
  // }
   
//   const userExists = await AddMember.findOne({ memberemail });

//   if (userExists) {
//     res.status(404);
//     throw new Error("User already exists");
//   }

  const user = await AddMember.create({
    membername, memberemail, memberphone, membercountry, memberstate, membercity, memberadult , memberbelow, memberaddress
  });

  if (user) {
    res.status(201).json({
        _id: user._id,
        membername: user.membername,
        memberemail: user.memberemail,
        memberphone: user.memberphone,
        membercountry: user.membercountry,
        memberstate: user.memberstate,
        membercity: user.membercity,
        memberadult: user.memberadult,
        memberbelow: user.memberbelow,
        memberaddress: user.memberaddress,
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


// const UpdateNote = asyncHandler(async (req, res) => {
//   const { amount,value,type,dateString } = req.body;

//   const note = await Club.findById(req.params.id);

//   // if (note.user.toString() !== req.user._id.toString()) {
//   //   res.status(401);
//   //   throw new Error("You can't perform this action");
//   // }

//   if (note) {
//     note.amount = amount;
//     note.value = value;
//     note.type = type;
//     dateString.type = dateString;
//     const updatedNote = await note.save();
//     res.json(updatedNote);
//   } else {
//     res.status(404);
//     throw new Error("Note not found");
//   }
// });



// const getsingleRecord = asyncHandler(async (req, res) => {

//   const note = await Club.findById(req.params.id);

//   if (note) {
//     res.json(note);
//   } else {
//     res.status(404).json({ message: "Note not found" });
//   }

//   res.json(note);
// });

// const DeleteMember = asyncHandler(async (req, res) => {
//   const user = await AddMember.findById(req.params.id);

//   if (user.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   if (user) {
//     await user.remove();
//     res.json({ message: "Note Removed" });
//   } else {
//     res.status(404);
//     throw new Error("Note not Found");
//   }
// });

// const UpdateMember = asyncHandler(async (req, res) => {
//   const user = await AddMember.findById(req.user._id);

//   if (user) {
//     user.membername = req.body.membername || user.membername;
//     user.memberemail = req.body.memberemail || user.memberemail;  

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       membername: updatedUser.membername,
//       memberemail: updatedUser.memberemail,
//      // pic: updatedUser.pic,
//      // isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User Not Found");
//   }
// });

const getMember = asyncHandler(async (req, res) => {
  AddMember.find( function (err, users) {
    var userMap = {};
    users.forEach(function(user) {
      //userMap[user._id] = user;
      userMap[user._id] = user;
     // console.log(user);
    });

    res.send(userMap);
  })
});


export { addmember, getMember};
