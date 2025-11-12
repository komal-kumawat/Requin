import express from "express";
import { loginUser, RegisterUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/register" , RegisterUser);
router.post("/login" , loginUser);
export default router;