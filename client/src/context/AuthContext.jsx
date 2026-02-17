import { createContext, Children, useState, useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"


export const AuthContext= createContext(null);

const backendUrl=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=backendUrl;

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(localStorage.getItem("token") || null);
    const [onlineUsers,setOnlineUsers]=useState([])
    const [socket,setSocket]=useState(null);

    

    
    const login=async(state,credentials)=>{
        try{

            const {data}= await axios.post(`/api/auth/${state}`,credentials);
            
           
            if(data.success){
                setUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common["Authorization"]=`Bearer ${data.token}`;
                setToken(data.token);
                localStorage.setItem("token",data.token)
                toast.success(data.message)
            }
            else{
               
                toast.error(data.message)
            }

        }
        catch(err){
            toast.error(err.response?.data?.message || err.message)
        }

    }


    const logout=()=>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setOnlineUsers([]);
        delete axios.defaults.headers.common["Authorization"];
        toast.success("Logged out successfully")
        socket.disconnect();
    }
    

    const updateProfile=async(body)=>{
        try{
            const {data}=await axios.put("/api/update-profile",body);
            
            if(data.success){
                setUser(data.user);
                toast.success("Profile Update Succesfully")
            }

        }
        catch(err){
            toast.error(err.message)
        }

    }

    const connectSocket=(userData)=>{
        if(!userData || socket?.connected) return ;

        const newSocket= io(backendUrl,{
            query:{
                userId:userData._id,
            }
        })
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUsers(userIds)
        })
    }
    useEffect(()=>{
        if(!token) return ;
        if(token) axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
        const checkAuth=async()=>{
            try{
                const {data}=await axios.get("/api/check");
                if(data.success){
                    setUser(data.user);
                    connectSocket(data.user);
                }
            }
            catch(err){
                console.log(err.message);
                toast.error(err.message)
            }
        }
        checkAuth();

    },[])

    

    const value={
        user,token,onlineUsers,socket,login,logout,updateProfile
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}