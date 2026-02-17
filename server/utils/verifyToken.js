import jwt from "jsonwebtoken"
export const verifyToken=(token)=>{
    try{
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        return {success:true,data:payload}
    }
    catch(err){
        console.log(err.message)
        return {success:false,message:"Invalid Token!"}
    }
}

export default verifyToken