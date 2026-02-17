import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,unique:true,minlength:6},
    profilePic:{type:String,default:"https://i.pinimg.com/736x/0f/69/1c/0f691cd77a8c6d90f07b35c10c95668f.jpg"},
    bio:{type:String,default:""}
},{timestamps:true})

const userModel= mongoose.models.User || mongoose.model("User",userSchema);

export default userModel;