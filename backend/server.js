// packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// utils
import connectMongDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse the form data 

app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on this port ${PORT}`);
    connectMongDB(); 
});

//middleware is just a function that runs between request and responses 
