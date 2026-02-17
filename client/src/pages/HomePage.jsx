import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import {Moon, Sun} from "lucide-react"
import { LightContext } from '../context/LightMode'
import { ChatContext } from '../context/ChatContext'
import { useMediaQuery } from "react-responsive";

const HomePage = () => {
  const {selectedUser}=useContext(ChatContext)
  const {mode,setMode}=useContext(LightContext)
  
  const isMobile556 = useMediaQuery({ 
    query: "(max-width: 556px)" 
  });
  

  

  return (
    <div className='w-full h-screen sm:px-[10%] sm:py-[4%] 
    bg-[var(--bg-primary)] 
    text-[var(--text-primary)] 
    transition-colors duration-300'>

      <div className={`rounded-2xl overflow-hidden h-full grid grid-cols-1 relative
      bg-[var(--bg-secondary)] 
      border border-[var(--border-medium)]
      ${selectedUser 
        ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
        : 'md:grid-cols-2'}`}>

        <Sidebar 
        />

        <ChatContainer 
          
        />

        <RightSidebar 
          
        />

      </div>

      {(!selectedUser && isMobile556)  && <div className='absolute md:top-2 right-6 xl:top-10 xl:right-20 max-md:top-7 max-sm:right-17'>
        {mode==="light"?<Moon onClick={()=>setMode("dark")} size={30} className="cursor-pointer" />:<Sun  onClick={()=>setMode("light")} className='cursor-pointer' size={30} fill='#ffffff' />}
      
      </div>}

      {(!selectedUser && !isMobile556) && <div className='absolute md:top-2 right-6 xl:top-10 xl:right-20 max-md:top-7 max-sm:right-17'>
        {mode==="light"?<Moon onClick={()=>setMode("dark")} size={30} className="cursor-pointer" />:<Sun  onClick={()=>setMode("light")} className='cursor-pointer' size={30} fill='#ffffff' />}
      
      </div>}
    </div>
  )
}

export default HomePage
