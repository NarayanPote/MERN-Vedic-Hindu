import express from "express";
import multer from "multer";
import AddCategory from "../models/addcategoriesModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

const Router = express.Router();



const upload = multer({
  limits: {
    fileSize: 10000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true); // continue with upload
  },
});



Router.post(
  "/addcategories",
  upload.single("photo"),
  async (req, res) => {

    // const userExists = await Shopphoto.findOne( { email } );
    // console.log(userExists);

    // if (userExists) {
    //   res.status(404);
    //   throw new Error("User already exists");
    // }


    try {
      
      const addcategory = new AddCategory(req.body);
 //console.log(file);
      const file = req.file.buffer;
     
      addcategory.photo = file;
      console.log(addcategory);

      await addcategory.save();
      res.status(201).send({
        _id: addcategory._id,
        categorynameinenglish: addcategory.categorynameinenglish,
        categorynameinhindi: addcategory.categorynameinhindi,
        token: generateToken(addcategory._id),
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



Router.get("/categories", async (req, res) => {
  try {
    const addcategory = await AddCategory.find({});
  //  res.set("Content-Type", "image/jpeg");
    res.send(addcategory);
  } catch (error) {
    res.status(500).send({ get_error: "Error while getting list of photos." });
  }
});

Router.get("/categories/:id", async (req, res) => {
  try {
    const result = await AddCategory.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

Router.get("/getcategories/:id", async (req, res) => {
  try {
    const addcategory = await AddCategory.findById(req.params.id);

    res.send(addcategory);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});


Router.put("/updatecategories/:id", async (req, res) => {

    try {
      const { categorynameinenglish,categorynameinhindi } = req.body;
      const addcategory = await AddCategory.findById(req.params.id);
       


      if (addcategory) {
        addcategory.categorynameinenglish = categorynameinenglish;
        addcategory.categorynameinhindi = categorynameinhindi;

        const updatedCategory = await addcategory.save();
        res.json(updatedCategory);
      } else {
        res.status(404);
        throw new Error("Note not found");
      }


    } catch (error) {
      res.status(500).send({
        upload_error: "Error while uploading file...Try again later.",
      });
    }
  },

);

export default Router;
