import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


export const generateJWTToken=async(userId)=>{
    try{
       
        const findUser=await userModel.findById({_id:userId});
        console.log(findUser)
       
        if(!findUser) return {success:false,message:"User Not Found"}

        const payload={userId:userId};
        const token= jwt.sign(payload,process.env.SECRET_KEY);

        return token;
    }
    catch(err){
        console.log(err.message)
        return {success:false,message:"User Not Found"}
    }

}