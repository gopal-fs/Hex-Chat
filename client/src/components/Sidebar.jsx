import React, { useContext, useEffect, useState } from 'react'
import assets from '../assests/assets'
import { useNavigate } from 'react-router-dom'
import { EllipsisVertical, Search } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Sidebar = () => {
  const navigate = useNavigate()
  const { logout, onlineUsers } = useContext(AuthContext)
  const { selectedUser, setSelectedUser, users, getUsers, unSeenMessages, setUnseenMessages } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);


  const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(() => {

    getUsers();

  }, [onlineUsers]);
  return (
    <div className={`h-full p-5 overflow-y-auto 
    bg-[var(--bg-chat)] 
    text-[var(--text-primary)]
    border-r border-[var(--border-light)]
    ${selectedUser ? 'max-md:hidden' : ''}`}>

      {/* Top Section */}
      <div className='pb-6'>

        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <img src="/logos.png" alt='logo' className='max-w-22' />
            <p>Hex Chat</p>

          </div>


          <div className='relative py-2'>

            <EllipsisVertical
              size={24}
              onClick={() => setShowMenu(prev => !prev)}
              className='cursor-pointer opacity-70 hover:opacity-100 transition'
            />

            {showMenu && (
              <div className='absolute top-full right-0 z-20 w-40 p-4 rounded-lg shadow-lg
    bg-[var(--bg-secondary)]
    border border-[var(--border-medium)]
    text-[var(--text-primary)]'>

                <p
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/profile');
                  }}
                  className='text-sm cursor-pointer hover:text-[var(--color-primary)] transition'
                >
                  Edit Profile
                </p>

                <hr className='my-3 border-[var(--border-light)]' />

                <p
                  onClick={() => {
                    setShowMenu(false);
                    logout();
                  }}
                  className='text-sm cursor-pointer hover:text-[var(--color-primary)] transition'
                >
                  Logout
                </p>

              </div>
            )}

          </div>

        </div>

        {/* Search */}
        <div className='rounded-full flex items-center gap-3 py-3 px-4 mt-6
        bg-[var(--bg-secondary)]
        border border-[var(--border-light)]'>

          <Search className="opacity-70" size={20} />
          {/* <img src={assets.search_icon} alt='search' className='w-4 opacity-60' /> */}

          <input
            type='text'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder='Search User'
            className='bg-transparent outline-none text-sm flex-1
            text-[var(--text-primary)]
            placeholder-[var(--text-muted)]'
          />
        </div>

      </div>

      {/* User List */}
      <div className='flex flex-col gap-2'>

        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages(prev => ({
                ...prev,
                [user._id]: 0
              }));
            }}

            className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
            hover:bg-[var(--border-light)]
            ${selectedUser?._id === user._id
                ? 'bg-[var(--border-light)]'
                : ''}`}>

            <img
              src={user?.profilePic ?? assets.avatar_icon}
              alt=''
              className='w-10 h-10 rounded-full object-cover'
            />

            <div className='flex flex-col leading-5'>
              <p className='text-sm font-medium'>
                {user.fullName}
              </p>

              {onlineUsers.includes(user._id) ? (
                <span className='text-[var(--color-accent)] text-xs'>
                  Online
                </span>
              ) : (
                <span className='text-[var(--text-muted)] text-xs'>
                  Offline
                </span>
              )}
            </div>

            {unSeenMessages[user._id] > 0 && (
              <p className='absolute top-3 right-3 text-xs h-5 w-5 rounded-full flex justify-center items-center
              bg-[var(--color-primary)] 
              text-white'>
                {unSeenMessages[user._id]}
              </p>
            )}

          </div>
        ))}

      </div>

    </div>
  )
}

export default Sidebar
