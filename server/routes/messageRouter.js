import express from "express"
import { authToken } from "../middlewares/authToken.js"
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController.js"


const messageRouter=express.Router()

messageRouter.get("/users",authToken,getUsersForSidebar);
messageRouter.get("/:id",authToken,getMessages);
messageRouter.put("/mark/:id",authToken,markMessageAsSeen);
messageRouter.post("/send/:id",authToken,sendMessage)

export default messageRouter