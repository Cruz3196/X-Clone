import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// signup method 
router.post("/signup", signup); 

// login method 
router.post("/login", login); 

// logout method 
router.post("/logout", logout); 

export default router;