import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file);
    await fs.unlinkSync(file);

    return response.secure_url;
  } catch (error) {
    await fs.unlinkSync(file);

    console.error(error);
  }
};
