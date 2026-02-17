import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import {Moon, Sun} from "lucide-react"
import { LightContext } from '../context/LightMode'
import { ChatContext } from '../context/ChatContext'

const HomePage = () => {
  const {selectedUser}=useContext(ChatContext)
  const {mode,setMode}=useContext(LightContext)
  

  

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

      <div className='absolute md:top-2 right-6 xl:top-10 xl:right-20 max-md:top-5 max-sm:right-17'>
        {mode==="light"?<Moon onClick={()=>setMode("dark")} size={30} className="cursor-pointer" />:<Sun  onClick={()=>setMode("light")} className='cursor-pointer' size={30} fill='#ffffff' />}
      
      </div>
    </div>
  )
}

export default HomePage
