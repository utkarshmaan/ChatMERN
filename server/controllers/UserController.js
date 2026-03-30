
// User signup

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res)=>{
    // destructure user data from user  req
    const {fullName, email, password, bio} = req.body;

    try{
        // check if any field is missing
        if(!fullName || !email || !password || !bio ){
            return res.json({success:false, message : "Missing Details"})
        }
        const user = await User.findOne({email});
        // check if user already exists
        if(user){
            return res.json({success:false, message : "Account already exist"})
        }

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // create new user
        const newUser = await User.create({fullName,email,password:hashedPassword,bio})


        const token = generateToken(newUser._id);

        res.json({success:true, userData:newUser, token, message:"Account created successfully"})

    }catch(e){
        console.log(e)
        res.json({success:false, message:e.message})
        
    }
}

// Controller for user login
export const login = async(req,res)=>{
    try{
        const { email, password} = req.body;

        // find user
        const userData = await User.findOne({email});
        
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({success:false, message:"Invalid Credentials"})
        }

        const token = generateToken(userData._id);

        res.json({success:true, userData, token, message:"Login successfully"})


    }catch(e){
        console.log(e.message)
        res.json({success:false, message:e.message})
    }
}


// Authenticate user

export const checkAuth = (req,res)=>{
    
    res.json({success:true, user:req.user});
}


//Controller to Update profile
export const updateProfile=async(req,res)=>{
    try {
        const {profilePic, bio, fullName}=req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio,fullName},
                {new: true});
        }else{
            // upload image to cloudinary and then get url
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser= await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url,bio,fullName},
                {new:true});
        }

        res.json({success:true, user:updatedUser})
    } catch (e) {
        console.log(e.message)
        res.json({success:false, message:e.message})
    }
}