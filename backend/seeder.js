import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import colors from "colors";
import path from "path";


import userRoutes from "./routes/userRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import existingmemberRoutes from "./routes/existingmemberRoutes.js";
import newmemberRoutes from "./routes/newmemberRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/users", userRoutes);
app.use("/api/clubusers", clubRoutes);
app.use("/api/existingmember", existingmemberRoutes);
app.use("/api/newmember", newmemberRoutes);
app.use("/api/member", memberRoutes);


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



