import { createContext, useEffect, useState } from "react";





export const LightContext= createContext(null)

export const LightProvider=({children})=>{
    
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("mode") || "light";
      });
          useEffect(()=>{
        
        if(mode==="light"){
            document.documentElement.classList.remove("dark");
        }
        else{
            document.documentElement.classList.add("dark")
        }

        localStorage.setItem("mode",mode)

    },[mode])
    return (
        <LightContext.Provider value={{mode,setMode}}>
        {children}
    </LightContext.Provider>

    )
    

}

