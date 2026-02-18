import userModel from "../models/userModel.js";
import verifyToken from "../utils/verifyToken.js";
import jwt from "jsonwebtoken"

export const authToken = async(req, res, next) => {
    try {

      
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Invalid Token!"
        });
      }
  
      const token = authHeader.split(" ")[1];
      
      console.log(token)
      
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      
      console.log(payload)
      const findUser=await userModel.findById(payload.userId)
      
      if(!findUser) return res.status(401).json({success:false,message:"Invalid User"})

      req.user = findUser; 
  
      next();
  
    } catch (err) {
        console.log(err)
      return res.status(401).json({
        success: false,
        message: "Invalid Token!"
      });
    }
  };
  