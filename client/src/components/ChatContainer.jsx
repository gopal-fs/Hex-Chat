import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assests/assets'
import { formatMessageTime } from '../libs/utils'
import { ImageUp } from 'lucide-react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'


const ChatContainer = () => {
    const scrollEnd=useRef();
    const {selectedUser,setSelectedUser,messages,sendMessage,setMessages,getMessages}=useContext(ChatContext)
    const {user,onlineUsers}=useContext(AuthContext);
    const [input,setInput]=useState("")
    const [loading,setLoading]=useState(false);

    const handleSendMessage=async(e)=>{
      setLoading(true);
      e.preventDefault();
      if(input.trim()==="") return null ;
      await sendMessage({text:input.trim()});
      setLoading(false);
      setInput("");
    }

    const handleSendImage=async(e)=>{
      const file=e.target.files[0];
      if(!file || !file.type.startsWith("image/")){
        return toast.error("Select an Image File")
      }
      const reader= new FileReader();
      reader.onloadend=async()=>{
        await sendMessage({text:"",image:reader.result})
        e.target.value=""
      };
      reader.readAsDataURL(file)
    }

    useEffect(()=>{
      if(selectedUser){
        getMessages(selectedUser._id)
      
      }
    },[selectedUser])

    useEffect(()=>{
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({behavior:'smooth'})
        }
    },[messages])

  return selectedUser? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg bg-[var(--bg-chat)] text-[var(--text-primary)]'>

       <div className='flex items-center gap-3 py-3 mx-4 border-b border-[var(--border-light)]'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt='profile' className='w-8 rounded-full' />
        <p className='flex-1 text-lg flex items-center gap-2'>
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id)?<span className='w-2 h-2 rounded-full bg-[var(--color-accent)]'></span>:null}
        </p>
        <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt='arrow' className='md:hidden max-w-7'/>
        <img src={assets.help_icon} alt='help' className='max-w-5 hidden md:block cursor-pointer' />
       </div>

       {/* Chat Container */}
       <div className='h-[calc(100%-120px)] flex flex-col overflow-y-scroll p-3 pb-6'>
        {messages.map((message,index)=>(
            <div className={`flex items-end gap-2 justify-end ${message.senderId !==user._id && 'flex-row-reverse' }`} key={index}>
                
                {message.image ? (
                  <img 
                    src={message.image} 
                    className='max-w-[230px] border border-[var(--border-light)] rounded-lg overflow-hidden mb-8'  
                    alt='image' 
                  />
                ) : (
                  <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all
                  ${message.senderId ===user._id
                    ? 'bg-[var(--chat-sent-bg)] text-[var(--chat-sent-text)] rounded-br-none'
                    : 'bg-[var(--chat-received-bg)] text-[var(--chat-received-text)] rounded-bl-none'
                  }`}>
                    {message.text}
                  </p>
                )}

                <div className='text-center text-xs'>
                    <img 
                      src={message.senderId===user._id? user.profilePic || assets.avatar_icon: selectedUser?.profilePic || assets.profile_martin} 
                      className='w-7 rounded-full' 
                    />
                    <p className='text-[var(--text-muted)]'>
                      {formatMessageTime(message.createdAt)}
                    </p>
                </div>
            </div>
        ))}
        <div ref={scrollEnd}></div>
       </div>

       {/* Bottom */}
       <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 
       bg-[var(--bg-secondary)] border-t border-[var(--border-light)]'>

        <div className='flex-1 flex items-center bg-[var(--bg-primary)] px-3 rounded-full border border-[var(--border-light)]'>
            <input 
              type='text' 
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              onKeyDown={(e)=>e.key==="Enter"?handleSendMessage(e):null}
              placeholder='Send a Message' 
              className='flex-1 text-sm p-3 border-none rounded-lg outline-none 
              bg-transparent text-[var(--text-primary)] 
              placeholder-[var(--text-muted)]' 
            />
            <input onChange={handleSendImage} type='file' hidden id='image' accept='image/png, image/jpeg' />
            <label htmlFor='image'>
            <ImageUp className="cursor-pointer mr-2" size={24}   />
                {/* <img src={assets.gallery_icon} alt='image' className='w-5 cursor-pointer mr-2' /> */}
            </label>
        </div>

        <button disabled={loading} onClick={handleSendMessage}><img  src={assets.send_button} className='w-7 cursor-pointer' /></button>
       </div>

    </div>
  ) : (
    <div className='flex flex-col justify-center items-center gap-2 
    text-[var(--text-secondary)] 
    bg-[var(--bg-chat)] 
    max-md:hidden'>
        <img src={assets.logo_icon} className='max-w-16'  />
        <p className='text-lg font-medium text-[var(--text-primary)]'>
          Chat anytime, anywhere
        </p>
    </div>
  )
}

export default ChatContainer
