import express from "express"
import { checkAuth, updateProfile } from "../controllers/userController.js"
import { authToken } from "../middlewares/authToken.js";

const userRouter=express.Router()

userRouter.put("/update-profile",authToken,updateProfile);
userRouter.get("/check",authToken,checkAuth)

export default userRouter;