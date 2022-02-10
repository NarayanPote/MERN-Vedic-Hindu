import asyncHandler from "express-async-handler";
import AddPilgrimage from "../models/addpilgrimageModel.js";
import generateToken from "../utils/generateToken.js";


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const addPilgrimage = asyncHandler(async (req, res) => {
  const { pilgrimagenameinenglish, pilgrimagenameinhindi } = req.body;
   
//   const userExists = await AddDieties.findOne({ email });

//   if (userExists) {
//     res.status(404);
//     throw new Error("User already exists");
//   }

  const user = await AddPilgrimage.create({
    pilgrimagenameinenglish, pilgrimagenameinhindi   
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      pilgrimagenameinenglish: user.pilgrimagenameinenglish,
      pilgrimagenameinhindi: user.pilgrimagenameinhindi,  
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updatePilgrimage = asyncHandler(async (req, res) => {
  const { pilgrimagenameinenglish,pilgrimagenameinhindi } = req.body;

  const note = await AddPilgrimage.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (note) {
    note.pilgrimagenameinenglish = pilgrimagenameinenglish;
    note.pilgrimagenameinhindi = pilgrimagenameinhindi;
    const updatedPilgrimage = await note.save();
    res.json(updatedPilgrimage);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const getsingleRecord = asyncHandler(async (req, res) => {

  const note = await AddPilgrimage.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});




const getPilgrimage = asyncHandler(async (req, res) => {
    AddPilgrimage.find( function (err, users) {
      var userMap = {};
      users.forEach(function(user) {
        //userMap[user._id] = user;
        userMap[user._id] = user;
       // console.log(user);
      });
  
      res.send(userMap);
    })
  });

  const DeletePilgrimage = asyncHandler(async (req, res) => {
    const note = await AddPilgrimage.findById(req.params.id);
  
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


export { addPilgrimage, getPilgrimage, getsingleRecord, updatePilgrimage, DeletePilgrimage} ; 
