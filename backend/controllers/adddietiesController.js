import asyncHandler from "express-async-handler";
import AddDieties from "../models/adddietiesModel.js";
import generateToken from "../utils/generateToken.js";


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const addDieties = asyncHandler(async (req, res) => {
  const { dietynameinenglish, aliasnameinenglish, dietynameinhindi, aliasnameinhindi } = req.body;
   
//   const userExists = await AddDieties.findOne({ email });

//   if (userExists) {
//     res.status(404);
//     throw new Error("User already exists");
//   }

  const user = await AddDieties.create({
    dietynameinenglish, aliasnameinenglish, dietynameinhindi, aliasnameinhindi   
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      dietynameinenglish: user.dietynameinenglish,
      aliasnameinenglish: user.aliasnameinenglish, 
      dietynameinhindi: user.dietynameinhindi,
      aliasnameinhindi: user.aliasnameinhindi,  
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

// const updateDieties = asyncHandler(async (req, res) => {

  
//   const user = await AddDieties.findById(req.user._id);

//   if (user.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   if (user) {
//     user.dietynameinenglish = req.body.dietynameinenglish || user.dietynameinenglish;
//     user.aliasnameinenglish = req.body.aliasnameinenglish || user.aliasnameinenglish;
//     user.dietynameinhindi = req.body.dietynameinhindi || user.dietynameinhindi;
//     user.aliasnameinhindi = req.body.aliasnameinhindi || user.aliasnameinhindi;
//     // user.pic = req.body.pic || user.pic;
//     // if (req.body.password) {
//     //   user.password = req.body.password;
//     // }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       dietynameinenglish: updatedUser.dietynameinenglish,
//       aliasnameinenglish: updatedUser.aliasnameinenglish,
//       dietynameinhindi: updatedUser.dietynameinhindi,
//       aliasnameinhindi: updatedUser.aliasnameinhindi,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User Not Found");
//   }
// });

// const updateDieties = asyncHandler(async (req, res) => {
//   const user = await AddDieties.findById(req.user._id);

//   if (user) {
//     user.dietynameinenglish = req.body.dietynameinenglish || user.dietynameinenglish;
//     user.aliasnameinenglish = req.body.aliasnameinenglish || user.aliasnameinenglish;
//     user.dietynameinhindi = req.body.dietynameinhindi || user.dietynameinhindi;
//     user.aliasnameinhindi = req.body.aliasnameinhindi || user.aliasnameinhindi

//     if (req.body.dietynameinenglish) {
//       user.dietynameinenglish = req.body.dietynameinenglish;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       dietynameinenglish: updatedUser.dietynameinenglish,
//       aliasnameinenglish: updatedUser.aliasnameinenglish,
//       dietynameinhindi: updatedUser.dietynameinhindi,
//       aliasnameinhindi: updatedUser.aliasnameinhindi,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     return res.status(404);
//     throw new Error("User Not Found");
//   }
// });

const updateDieties = asyncHandler(async (req, res) => {
  const { dietynameinenglish,aliasnameinenglish,dietynameinhindi,aliasnameinhindi, status } = req.body;
 console.log(req.body)
  const note = await AddDieties.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (note) {
    note.dietynameinenglish = dietynameinenglish;
    note.aliasnameinenglish = aliasnameinenglish;
    note.dietynameinhindi = dietynameinhindi;
    note.aliasnameinhindi = aliasnameinhindi;
    note.status = status;
   // dateString.type = dateString;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});


const DeleteDieties = asyncHandler(async (req, res) => {
  const note = await AddDieties.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  } 

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

const getsingleRecord = asyncHandler(async (req, res) => {

  const note = await AddDieties.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});


const getDieties = asyncHandler(async (req, res) => {
    AddDieties.find( function (err, users) {
      var userMap = {};
      users.forEach(function(user) {
        //userMap[user._id] = user;
        userMap[user._id] = user;
       // console.log(user);
      });
  
      res.send(userMap);
    })
  });



export { addDieties, getDieties, getsingleRecord, updateDieties, DeleteDieties}; 
