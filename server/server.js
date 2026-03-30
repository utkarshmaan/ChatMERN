/**
 * CHAT APP - BACKEND SERVER
 * This is the main entry point for the Chat Application backend.
 * 
 * ============================================================================
 * FEATURES:
 * - User Authentication (Sign up, Login, Profile Update)
 * - Real-time Messaging with Socket.io
 * - Message Storage in MongoDB
 * - Online User Tracking
 * - Image Upload to Cloudinary
 * ============================================================================
 */

import express from "express"
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userroutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
// start from 2:54:00

//create express app and HTTP server 
const app=express();
const server=http.createServer(app);

// Initialize socket.io server
export const io = new Server(server,{
    cors:{origin:"*"}
})

// store online users
export const userSocketMap={};  //{ userId:socketId }

// Socket.io connection handeler
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User connected",userId)

    if(userId){
        userSocketMap[userId] = socket.id;
    }

    // emit online users to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
    socket.on("disconnect",()=>{
        console.log("User disconnected");
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })

})

// Middleware setup

app.use(express.json({limit:"4mb"}))
app.use(cors());


// Route setup
app.use("/api/status",(req,res)=>res.send("server is live"));
app.use("/api/auth",userRouter);

app.use("/api/messages",messageRouter);



// Connect to mongodb
await connectDB();



const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>console.log("Server is running on PORT :"+PORT));


