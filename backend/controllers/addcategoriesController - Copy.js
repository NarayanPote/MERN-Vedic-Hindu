import asyncHandler from "express-async-handler";
import AddCategory from "../models/addcategoriesModel.js";
import generateToken from "../utils/generateToken.js";


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const addCategories = asyncHandler(async (req, res) => {
  const { categorynameinenglish, categorynameinhindi } = req.body;
   
//   const userExists = await AddDieties.findOne({ email });

//   if (userExists) {
//     res.status(404);
//     throw new Error("User already exists");
//   }

  const user = await AddCategory.create({
    categorynameinenglish, categorynameinhindi   
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      categorynameinenglish: user.categorynameinenglish,
      categorynameinhindi: user.categorynameinhindi,  
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateCategories = asyncHandler(async (req, res) => {
  const { categorynameinenglish,categorynameinhindi } = req.body;

  const note = await AddCategory.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (note) {
    note.categorynameinenglish = categorynameinenglish;
    note.categorynameinhindi = categorynameinhindi;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const getsingleRecord = asyncHandler(async (req, res) => {

  const note = await AddCategory.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});




const getCategories = asyncHandler(async (req, res) => {
    AddCategory.find( function (err, users) {
      var userMap = {};
      users.forEach(function(user) {
        //userMap[user._id] = user;
        userMap[user._id] = user;
       // console.log(user);
      });
  
      res.send(userMap);
    })
  });



export { addCategories, getCategories, getsingleRecord, updateCategories} ; 
