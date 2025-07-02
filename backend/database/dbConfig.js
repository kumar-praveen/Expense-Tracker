import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("Connected to Database successfully");
  } catch (error) {
    console.log("error in database connection: ", error);
  }
};

export default connectDb;
