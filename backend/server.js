// packages
// the path module is a built in node module 
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

// utils
import connectMongDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 3001;

// *configuring the backend to the front end 
const __dirname = path.resolve();

app.use(express.json({limit: "5mb"})); // to parse req.body & allowing large files to be uploaded. also this shouldn't be too large if an attacker sends a large request to your application, then your server might crash.which is called DoS (DoS = Denial of Service)
app.use(express.urlencoded({ extended: true })); // to parse the form data 

app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

//* navigating the user to the react application
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on this port ${PORT}`);
    connectMongDB(); 
});

//middleware is just a function that runs between request and responses 
