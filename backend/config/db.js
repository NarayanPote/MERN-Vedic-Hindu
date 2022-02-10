//Connection file to mongo db
import mongoose from "mongoose";
// import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/club-temp', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};  

export default connectDB;