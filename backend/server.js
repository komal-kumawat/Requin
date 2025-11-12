import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboard.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=>console.log("mongodb connected successfully"))
.catch((err)=>{"error connecting mongodb"});

app.use("/api/v1/auth" , router);
app.use("/api/v1/dashboard" ,dashboardRouter )
app.listen(port , ()=>{
    console.log(`app listening to port ${port}`);
})