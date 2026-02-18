import cloudinary from "../configs/cloudinary.js";
import messageModel from "../models/messageSchema.js";
import userModel from "../models/userModel.js";
import { io,userSocketMap } from "../server.js";
import dotenv from "dotenv"

dotenv.config();

export const getUsersForSidebar=async(req,res)=>{

    try{
        const userId=req.user._id;
        if(!userId) return res.status(401).json({success:false,message:"Invalid User"});

        //Get All Users except Logged in User
        const getUsers = await userModel
        .find({ _id: { $ne: userId } })
        .select("-password");
    

        //Count Unseen messages
        let unseenMessages={};

        const promises=getUsers.map(async(user)=>{
            const messages = await messageModel.find({
                senderId: user._id,
                receiverId: userId,
                seen: false
            });
            
            if(messages.length>0){
                unseenMessages[user._id]=messages.length;
            }
        })

        await Promise.all(promises)


        return res.status(200).json({success:true,users:getUsers,unseenMessages});
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({success:false,message:err.message})
    }

}

//get All Messages For selected user
export const getMessages=async(req,res)=>{
    try{
        const selectedUserId=req.params.id;
        const myId=req.user._id;
        if(!selectedUserId || !myId) res.status(401).json({success:false,message:"Invalid User"})

            const messages = await messageModel.find({
                $or: [
                    { senderId: myId, receiverId: selectedUserId },
                    { senderId: selectedUserId, receiverId: myId }
                ]
            }).sort({ createdAt: 1 });
            

        await messageModel.updateMany({senderId:selectedUserId,receiverId:myId},{seen:true});

        return res.status(200).json({success:true,messages})
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({success:false,message:err.message})
    }

}


export const markMessageAsSeen=async(req,res)=>{
    try{
        const {id}=req.params

        await messageModel.findByIdAndUpdate(id,{seen:true});
        return res.status(200).json({success:true})
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({success:false,message:err.message})
    }

}


export const sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const receiverId=req.params.id;
        const senderId=req.user._id;

        let imageUrl;
        console.log("hits1")
        if(image){
            const res=await cloudinary.uploader.upload(image);
            imageUrl=res.secure_url;
        }
        console.log("hits2")
        const newMessage= await new messageModel({senderId,receiverId,text,image:imageUrl});
        await newMessage.save();
        console.log("hits3")
        const receiverSocketId=userSocketMap[receiverId]
        if(receiverSocketId) io.to(receiverSocketId).emit("newMessage",newMessage)
            console.log("hits4")
        return res.status(200).json({success:true,newMessage})

    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({success:false,message:err.message})
    }

}