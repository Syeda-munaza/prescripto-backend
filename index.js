import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";

import adminRouter from "./routes/admin.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());
// test endpoint
app.get("/", (req, res) => {
  res.send("Server is listening!");
});
app.use("/api/admin", adminRouter);

//backend server
app.listen(port, () => {
  console.log(`Server is listening on port ${"http://localhost:" + port}`);
});
