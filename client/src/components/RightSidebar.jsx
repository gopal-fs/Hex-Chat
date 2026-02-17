import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assests/assets'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';

const RightSidebar = () => {

  const {selectedUser,messages}=useContext(ChatContext);
  const {logout,onlineUsers}=useContext(AuthContext);
  const [msgImages,setmsgImages]=useState([])


  useEffect(()=>{
    setmsgImages(messages.filter(msg=>msg.image).map(msg=>msg.image))
  },[messages])
  return selectedUser && (
    <div className={`overflow-y-auto w-full relative
    bg-[var(--bg-chat)]
    text-[var(--text-primary)]
    border-l border-[var(--border-light)]
    ${selectedUser ? 'max-md:hidden' : ''}`}>

      {/* Profile Section */}
      <div className='pt-8 flex flex-col items-center gap-3 text-sm font-light px-6'>

        <img 
          src={selectedUser?.profilePic || assets.avatar_icon} 
          className='w-24 h-24 rounded-full object-cover border
          border-[var(--border-medium)]' 
          alt='profile' 
        />

        <h1 className='text-xl font-semibold flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-[var(--color-accent)]'></span>}
          
        </h1>

        <p className='text-[var(--text-secondary)] text-center'>
          {selectedUser.bio}
        </p>

      </div>

      <hr className='border-[var(--border-light)] my-6 mx-6' />

      {/* Media Section */}
      <div className='px-6 text-sm'>
        <p className='font-medium text-[var(--text-primary)]'>Media</p>

        <div className='grid grid-cols-2 mt-4 max-h-[200px] overflow-y-auto gap-4'>

          {msgImages.map((image, index) => (
            <div 
              key={index} 
              className='cursor-pointer group'
              onClick={() => window.open(image)}>

              <img 
                src={image} 
                alt='media' 
                className='rounded-lg opacity-80 group-hover:opacity-100 transition duration-200'
              />
            </div>
          ))}

        </div>
      </div>

      {/* Logout Button */}
      <button 
      onClick={()=>logout()}
        className='absolute bottom-6 left-1/2 -translate-x-1/2
        py-3 px-16 rounded-full font-medium
        bg-[var(--btn-primary-bg)]
        text-[var(--btn-primary-text)]
        hover:bg-[var(--btn-primary-hover)]
        transition-all duration-200 shadow-md'>
        Logout
      </button>

    </div>
  )
}

export default RightSidebar
