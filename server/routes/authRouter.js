import { Login, signUp } from "../controllers/userController.js";
import express from "express" 


const authRouter= express.Router();

authRouter.post("/sign-up",signUp);
authRouter.post("/login",Login)
export default authRouter