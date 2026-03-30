import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { getMessages, getUserForSidebar, markMessageSeen, sendMessage } from "../controllers/MessageController.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUserForSidebar);

messageRouter.get("/:id",protectRoute,getMessages);

messageRouter.put("/mark/:id",markMessageSeen);

messageRouter.post("/send/:id",protectRoute,sendMessage)

export default messageRouter;