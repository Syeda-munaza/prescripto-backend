import express from "express";
import { validator } from "../middlewares/validator.js";
import { addDoctor, loginAdmin } from "../controllers/admin.js";
import upload from "../middlewares/multer.js";
import {
  doctorValidationFields,
  loginAdminValidation,
} from "../config/validation.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("image"),
  validator([doctorValidationFields]),
  addDoctor
);

adminRouter.post("/login", validator([loginAdminValidation]), loginAdmin);
export default adminRouter;
