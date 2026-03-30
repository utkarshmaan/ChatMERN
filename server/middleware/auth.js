// middleware is fun that is executed before executing the controller fun
// protect route, if user is authenticated then only user can access a particular endpoint

import User from "../models/User.js";
import jwt from "jsonwebtoken"
// middelware 

export const protectRoute = async (req,res,next)=>{
    try {
        // we send token from frontend in every api request
        const token = req.headers.token;

        // decode the toked: takes token and secret key and verify it if it is a valid token or not
        // returns the decoded payload(userId and secret key) of the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.userId)
        .select("-password")//removes the password from user data


        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        req.user = user
        next();
    } catch (error) {
        console.log(error.message)
         return res.json({success:false, message:error.message})
    }
} 
