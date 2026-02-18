import express from "express"

import cors from "cors"
import bcrypt from "bcrypt"

import {createServer} from "http"
import { Server } from "socket.io"
import connectMongo  from "./configs/db.js";
import dotenv from "dotenv"
import authRouter from "./routes/authRouter.js"
import { authToken } from "./middlewares/authToken.js"
import userRouter from "./routes/userRouter.js"
import messageRouter from "./routes/messageRouter.js"
import { Socket } from "dgram"


dotenv.config();


const app=express();
const server=createServer(app);
export const io=new Server(server,{cors:"*"})

export const userSocketMap={}

io.on("connection",(socket)=>{
   
    const userId=socket.handshake.query.userId;
    console.log(`User Connected ${userId}`)

    if(userId) userSocketMap[userId]=socket.id

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log(`User Disconnected ${userId}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

app.use(cors())
app.use(express.json({limit:"20mb"}))

app.use("/api/auth",authRouter);
app.use("/api",userRouter)
app.use("/api/messages",messageRouter);

app.get("/protected",authToken,(req,res)=>{
    console.log(req.user)
    return res.send("Welcome!")
})



app.get("/",(req,res)=>res.send("Hi"))
await connectMongo();

if(process.env.NODE_ENV!=="production"){
    server.listen(4000,()=>console.log("Running"))
}

export default server;