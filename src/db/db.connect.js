import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURI = process.env.MONGODB;

const connectToDatabase = async () => {
  await mongoose
    .connect(MONGOURI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) =>
      console.log("Error occured while connecting to DB", error)
    );
};

export default connectToDatabase;
