import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

const uploadOnCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET_APIKEY,
  });
  try {
    const result = await cloudinary.uploader.upload(file);
    await fs.unlinkSync(file);
    return result.secure_url;
  } catch (error) {
    await fs.unlinkSync(file);
    console.log(error);
  }
};

export default uploadOnCloudinary;
