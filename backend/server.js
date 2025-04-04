import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectMongDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on this port ${PORT}`);
    connectMongDB(); 
});