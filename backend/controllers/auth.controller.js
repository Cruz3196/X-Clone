import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try{

        const {fullName, username,email, password} = req.body;

        // creating an email for the user 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

        // checking to see if the user exists 
        const existingUser = await User.findOne({ username });
            if(existingUser){
                return res.status(400).json({error: "User is already taken"});
            }

        // checking for exisitng email 
        const existingEmail = await User.findOne({ email });
            if(existingEmail){
                return res.status(400).json({error: "Email is already in use"});
            }
        
        // hashing the password 
        const salt = await bcrypt.genSalt(10); // the bigger this value gets, the longer this will take to complete
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // creating new user 
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
        }else{

        }

    }catch (error){

    }
};
export const login = async (req, res) => {
    res.json({ data: "You hit the login endpoint",
    });
}
export const logout = async (req, res) => {
    res.json({ data: "You hit the logout endpoint",
    });
}