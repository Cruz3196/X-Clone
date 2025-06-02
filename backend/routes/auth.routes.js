import express from "express";
import { getMe, signup, login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//getting the authenticated users
router.get("/me", protectRoute ,getMe); 

// signup method 
router.post("/signup", signup); 

// login method 
router.post("/login", login); 

// logout method 
router.post("/logout", logout); 

export default router;