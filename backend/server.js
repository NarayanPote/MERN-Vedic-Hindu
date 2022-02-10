import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import colors from "colors";
import path from "path";
// import multer  from "multer";
 import cors from "cors";


import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
//import passwordResetRoutes from "./routes/passwordResetRoutes.js";


// import adddietiesRoutes from "./routes/adddietiesRoutes.js";

import photosRouter from "./routes/photos.js";
import addcategoriesRoutes from "./routes/addcategoriesRoutes.js";
import addpilgrimageRoutes from "./routes/addpilgrimageRoutes.js";
import addtempleRoutes from "./routes/addtempleRoutes.js";


import fs from "fs";
// import adminRoutes from "./routes/adminRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();


connectDB();


const app = express(); // main thing


app.use(express.json()); // to accept json data

// app.use('./uploads/images', express.static(path.join('uploads', 'images')));


// app.use((error, req, res, next) => {
//   if (req.file) {
//       fs.unlink(req.file.path, (error) => {
//           console.log(error);
//       });
//   }
//   if (res.headerSent) {
//       return next(error);
//   }
//   res.status(error.code || 500)
//   res.json({ message: error.message || 'An unknown error occured!' });
// });

 app.use(cors());
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images"); //important this is a direct path fron our current file to storage location
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });



// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });



// const upload = multer({ storage: fileStorageEngine });



// app.post("/single", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Single FIle upload success");
// });



// app.post("/multiple", upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple Files Upload Success");
// });







app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
//app.use("/api/password-reset", passwordResetRoutes);


// app.use("/api/adddieties", adddietiesRoutes);
//app.use("/api/addcategories", addcategoriesRoutes);
app.use(photosRouter);
app.use(addcategoriesRoutes);
app.use(addtempleRoutes);
app.use("/api/addpilgrimage", addpilgrimageRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}..`)
);

