import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import Club from "../models/clubModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      password: user.password,
      username : user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
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





const CreateAdmin = asyncHandler(async (req, res) => {
  const { isactive } = req.body;

  if (!isactive) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Admin({ user: req.user._id, isactive });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
}); 






const AddAmount = asyncHandler(async (req, res) => {
  const { 
    slot1, 
    slot2,
    slot3,
    slot4,
    slot5,
    } = req.body;

 
    const note = new Club({  
        slot1, 
        slot2,
        slot3,
        slot4,
        slot5,
        });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  
});






export { authAdmin , getNotes , CreateAdmin, AddAmount};
