import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    { 
    // putting timestamp just incase for having a user since july 2023 
        username:{
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId, // 16 characters 
            ref: "User",
            default: [] // default for zero followers 
        }], 
        following: [{
            type: mongoose.Schema.Types.ObjectId, // 16 characters 
            ref: "User",
            default: [] // default for following sero users 
        }],
        profileImg: {
            type: String,
            default: "",
        },
        coverImg: {
            type: String,
            default: "",
        }, 
        bio:{
            type: String,
            default: "",
        },
        link: {
            type: String,
            default: "",
        },
        likedPosts: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Post",
                    default: [],
            },
        ],
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

// users 

export default User;