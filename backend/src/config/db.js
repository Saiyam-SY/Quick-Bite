import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "quickBite" });

    console.log("Connection with database is successfull");
  } catch (error) {
    console.log("Connection with database is failed", error);

    process.exit(1);
  }
};
