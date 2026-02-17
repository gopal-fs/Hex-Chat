import mongoose from "mongoose"


const connectMongo=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected!")
    }
    catch(err){
        console.log("Error",err.message)
    }
}


export default connectMongo;