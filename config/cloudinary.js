import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.Cloudinary_Name,
      api_key: process.env.Cloudinary_API_Key,
      api_secret: process.env.Cloudinary_API_Secret,
      secure: true,
    });
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error);
  }
};
export default connectCloudinary;
