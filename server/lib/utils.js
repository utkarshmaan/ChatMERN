
// Generate jwt token

import jwt from "jsonwebtoken"

export const generateToken = (userId)=>{
// create a token using userId and a secret key
    const token = jwt.sign({userId},process.env.JWT_SECRET)
    return token;
} 