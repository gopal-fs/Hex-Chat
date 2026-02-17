import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid";
import { generateJWTToken } from "../utils/generateToken.js";

import jwt from "jsonwebtoken"

import cloudinary from "../configs/cloudinary.js";
export const signUp=async (req,res)=>{

    try{
        const {fullName,email,password,bio}=req.body;
        
        
        if(!fullName || !email || !password || !bio) return res.send({success:false,message:"Missing Details"})
        
       
        const findUser= await userModel.findOne({email:email});
      
        if(findUser) 
            return res.status(400).json({
                success:false,
                message:"User Already Exists!"
            })
        
       
        const hashedPassword= await bcrypt.hash(password,10);

        const newuser= new userModel({email,password:hashedPassword,fullName,bio});
        await newuser.save();
     
        const token= await  generateJWTToken(newuser._id);
        
      
        res.send({success:true,userData:newuser,token,message:"Sign Up Successful!"})
        

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
    
    
}


export const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password) return res.send({success:false,message:"Invalid Details!"})
        const findUser= await userModel.findOne({email:email});
       
        if(!findUser) return res.send({success:false,message:"Invalid User!"})
        
        const isPasswordMatched=await bcrypt.compare(password,findUser.password);
        
        if(!isPasswordMatched)  return res.send({success:false,message:"Invalid Password"})
        
        const token= await generateJWTToken(findUser._id);
        return res.send({success:true,userData:findUser,token,message:"Login Successfull"})
    }
    catch(err){
        console.log(err.message)
        return res.send({success:false,message:"Invalid User"})
    }
}

export const checkAuth=(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}


export const updateProfile=async(req,res)=>{
    try{
        const {profilePic,bio,fullName}=req.body 
        console.log("Hits")
        let updatedUser;
        const userId=req.user._id;

        

        if(!profilePic){
            updatedUser=await userModel.findByIdAndUpdate(userId,{bio,fullName},{returnDocument: "after"});

        }
        else{
            const upload= await cloudinary.uploader.upload(profilePic);
            updatedUser=await userModel.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{returnDocument: "after"});
        }
       

        return res.status(200).json({success:true,user:updatedUser})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({success:false,message:"Unable to Profile Data"})
    }
}