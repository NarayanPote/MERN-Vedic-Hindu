import express from "express";
import multer from "multer";
import path from "path";
import Temple from "../models/addtempleModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

const Router = express.Router();




// Router.post(
//   "/login", asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   //console.log(req.body);
//   const user = await Shopphoto.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       country : user.country, 
//       state : user.state, 
//       city : user.city, 
//       contact : user.contact, 
//       website : user.website, 
//       clubregistrationnumber : user.clubregistrationnumber, 
//       yearofestabilishment : user.yearofestabilishment, 
//       trustformed : user.trustformed, 
//       aandgregister : user.aandgregister, 
//       gregister : user.gregister,
//       photo : user.photo,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid Email or Password");
//   }
// }))

// const upload = multer({
//   limits: {
//     fileSize: 10000000, // max file size 1MB = 1000000 bytes
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
//       cb(new Error("only upload files with jpg or jpeg format."));
//     }
//     cb(undefined, true); // continue with upload
//   },
// });



const upload = multer({
	
    storage: multer.diskStorage({
   destination(req, file, cb) {
     cb(null, './files');
   },
   filename(req, file, cb) {
     cb(null, `${new Date().getTime()}_${file.originalname}`);
   }
 }),
 
 limits: {
   fileSize: 1000000 // max file size 1MB = 1000000 bytes
 },
 fileFilter(req, file, cb) {

   if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
     cb(new Error('only upload files with jpg or jpeg format.'));
   }
   cb(undefined, true); // continue with upload
 }
});


Router.post(
  "/addtemple",
  upload.single("photo"),
  async (req, res) => {

    // const userExists = await Shopphoto.findOne( { email } );
    // console.log(userExists);

    // if (userExists) {
    //   res.status(404);
    //   throw new Error("User already exists");
    // }


    try {

        const { path,mimetype } = req.file;

        const photo = new Temple(req.body);
            photo.photo = req.file.path;
            photo.file_mimetype = req.file.mimetype
        // file_mimetype: mimetype   
        console.log(photo);
  

    //     const {photo} = req.file;
        
    //     const photo = new Temple(req.body);
    //     const file = req.file.buffer; 
    //       photo.photo = file;
    //   console.log(photo);


      await photo.save();
      res.status(201).send({
        _id: photo._id,
        templecategory: photo.templecategory,
        templepilgrimage: photo.templepilgrimage,
        templemaindiety: photo.templemaindiety,
        templenameinenglish: photo.templenameinenglish,
        templenameinhindi: photo.templenameinhindi,
       // status: photo.status,
     

        // address: photo.address,
        // country: photo.country,
        // state: photo.state,
        // city: photo.city,
        // contact: photo.contact,
        // website: photo.website,
        // clubregistrationnumber: photo.clubregistrationnumber,
        // yearofestabilishment: photo.yearofestabilishment,
        // trustformed: photo.trustformed,
        // aandgregister: photo.aandgregister,
        // gregister: photo.gregister,
        //photo: photo.photo,
        token: generateToken(photo._id),
      });
    } catch (error) {
      res.status(500).send({
        upload_error: "Error while uploading file...Try again later.",
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  }
);




// Router.post('/photos',  upload.single('photo'), (req, res, next) => {
//     const newImage = new Shopphoto({
//        id: req.body.id,
//       photo : req.file.path
//     });
//     newImage
//       .save()
//       .then((result) => {
//         console.log(result);
//         res.status(201).json({ _id: photo._id });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           error: err,
//         });
//       });
//   });



// Router.get("/photos", async (req, res) => {
//   try {
//     const photos = await AddDieties.find({});
//   //  res.set("Content-Type", "image/jpeg");
//     res.send(photos);
//   } catch (error) {
//     res.status(500).send({ get_error: "Error while getting list of photos." });
//   }
// });

// Router.get("/photos/:id", async (req, res) => {
//   try {
//     const result = await AddDieties.findById(req.params.id);
//     res.set("Content-Type", "image/jpeg");
//     res.send(result.photo);
//   } catch (error) {
//     res.status(400).send({ get_error: "Error while getting photo." });
//   }
// });

// Router.get("/getphotos/:id", async (req, res) => {
//   try {
//     const photos = await AddDieties.findById(req.params.id);

//     res.send(photos);
//   } catch (error) {
//     res.status(400).send({ get_error: "Error while getting photo." });
//   }
// });


// Router.put("/updatephotos/:id", async (req, res) => {

//     try {
//       const { dietynameinenglish,aliasnameinenglish,dietynameinhindi,aliasnameinhindi, status } = req.body;
//       console.log(req.body)
//       const photo = await AddDieties.findById(req.params.id);
       


//       if (photo) {
//         photo.dietynameinenglish = dietynameinenglish;
//         photo.aliasnameinenglish = aliasnameinenglish;
//         photo.dietynameinhindi = dietynameinhindi;
//         photo.aliasnameinhindi = aliasnameinhindi;
//         photo.status = status;
//        // dateString.type = dateString;
//         const updatedPhoto = await photo.save();
//         res.json(updatedPhoto);
//       } else {
//         res.status(404);
//         throw new Error("Note not found");
//       }


//     } catch (error) {
//       res.status(500).send({
//         upload_error: "Error while uploading file...Try again later.",
//       });
//     }
//   },

// );

export default Router;
