import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {

  const {logout, onlineUser, authUser} = useContext(AuthContext);

  // isme implement karna hai ki latest msg ka time show ho
  // const {messages} = useContext(ChatContext)
  // console.log(messages)


  const {getUsers, users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages
  } = useContext(ChatContext);

  const [input, setInput] = useState('')

  // It will throw error: Cannot read properties of undefined (reading 'map') if we do not use optional chaining
  // If users comes from props, API, or async data, it’s probably undefined initially.

  const filteredUser = input ? 
        users?.filter(
        (user)=> user.fullName.toLowerCase().includes(input.toLowerCase()) ) 
        :users ;

  const navigate=useNavigate();

  useEffect(()=>{
    getUsers();
  },[onlineUser])

  return (
    <div className={`bg-[#0e1b38] text-[#dee5ff] h-full p-5 border-gray-300 overflow-y-scroll w-[30%]
    text-white ${selectedUser ?' max-md:hidden w-[25%]':'w-[50%]'}`}>
      <div className=''>
        <div className='flex justify-between items-center'>
        <div className='flex justify-end gap-4'>
          <img src = {authUser.profilePic || assets.avatar_icon} alt="Profile" className='w-[35px] aspect-[1/1] rounded-full'></img>
          <p className='pt-1 text-2xl'>{authUser.fullName}</p>
        </div>
              {/* <img src={assets.logo} alt="logo" className='max-w-40'/> */}
          <div className='relative py-2 group'>
            <img src={assets.menu_icon} alt="enu" className='max-h-5 cursor-pointer'/>
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md
            bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500'/>
              <p className='cursor-pointer text-sm'
              onClick={()=>logout()}>Logout</p>
            </div>
            
          </div>
        </div>
        <div className='bg-[#192540] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="search" className='w-3 text-[#e8e8e8]'></img>
          <input type="text" 
          className='bg-transparent border-none outline-none placeholder-[#bab9b9] text-md flex-1' 
          placeholder='Search user...'
          onChange={(e)=> setInput(e.target.value)}
          />
        </div>
      </div>
      <hr className='border-[#54525250] border-2 mt-8 mb-4 rounded-xl'/>
      <div className='flex flex-col h-[70vh] overflow-scroll pt-4 rounded-t-3xl rounded-b-3xl'>
      { filteredUser &&
        filteredUser.map((user,index)=>{
        return <div key={index}
        onClick={()=>{ setSelectedUser(user), setUnseenMessages((prev)=>({...prev,[user._id]:0}) )}}
        // ${selectedUser?._id ==user._id && 'bg-[#282142]/50'}
         className={`relative flex items-center my-2 gap-2 px-4 py-5 rounded-2xl cursor-pointer ${selectedUser ===user ? 'border-l-2 border-l-[#a3a6ff]' : ''}   max-sm:text-sm bg-[#192540]`}>
          <img src={user?.profilePic || assets.avatar_icon} alt=''
            className='w-[45px] aspect-[1/1] rounded-full'
          />
          <div className='text-lg flex flex-col leading-5'>
          <p>{user.fullName}</p>
             {
              onlineUser.includes(user._id)
              ? <span className='text-green-400 text-xs'>Online</span>
              : <span className='text-neutral-500 text-xs'>Offline</span>
             }
          </div>
          {
            unseenMessages[user._id] >0
            && 
            <p className='absolute text-white top-4 right-4 text-xs h-5 w-5 flex justify-center items-center
            rounded-full bg-[#26d366]'>{unseenMessages[user._id]}</p>
          }
        </div>
      })}

      </div>
    </div>
  )
}

export default Sidebar