import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.js";
import jwt from "jsonwebtoken";

// API to add a new doctor to the portal
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      degree,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file;
    const existedEmail = await doctorModel.findOne({ email });
    if (existedEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    // add doctor to database
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      date: new Date(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
      data: {
        name,
        email,
        speciality,
        experience,
        degree,
        about,
        fee,
        address,
        image: req.file.filename,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//api for the Admin Login

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const payload = { email };

      // Sign JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d", // Token expires in 1 day
      });
      res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error", error });
  }
};
