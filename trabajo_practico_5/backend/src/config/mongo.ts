import mongoose from "mongoose";

process.loadEnvFile();

const URI_DB = process.env.URI_DB!;

const connectDB = async () => {
  try {
    await mongoose.connect(URI_DB);
    console.log("Successfuly connected to database");
  } catch (error) {
    console.log("Failed to connect to database");
  };
};

export { connectDB };