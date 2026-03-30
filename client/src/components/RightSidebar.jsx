import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import assets from '../assets/assets'

const RightSidebar = () => {

  const {selectedUser, messages, showProfile, setShowProfile} = useContext(ChatContext)
  const {logout, onlineUser } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  // get all images from the messages and set them to state

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMsgImages(
      messages.filter(message => message.image).map(message => message.image)
    )
  },[messages])

  return showProfile && (
    <div className={`bg-[#0e1b38] text-white w-[22%] relative overflow-y-scroll  
    ${selectedUser ? "max-md:hidden":""}`}>
    <div className="text-end text-xl my-4 mx-6 cursor-pointer"
    onClick={()=> setShowProfile(false)}>X</div>

      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light
      mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" 
        className='w-20 aspect-[1/1] rounded-full'/>
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
       
        {onlineUser.includes(selectedUser._id) && 
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
        }

        {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>
      <hr className='border-[#ffffff50] my-4'/>

      {/* new section to add here */}
      <div >
        <div className='flex gap-3 justify-center '>
          {/* <p className='px-5 text-xs'>chat nd videocall </p> */}
          <div className="flex justify-center items-center w-[70px] bg-gradient-to-r from-purple-400 to-violet-600 h-[70px] rounded-full">
            chat
          </div>
          {/* <hr className="w-[60px] bg-black transform -rotate-90 mt-8"/> */}
          <div className='border border-[#dce8ff]'></div>
          <div className="flex justify-center items-center w-[70px] bg-gradient-to-r from-purple-400 to-violet-600 h-[70px] rounded-full">
            video
          </div>
        </div>
        <div>
          
        </div>
      </div>

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2
          gap-4 opacity-80'>
          {
            msgImages.map((url,index)=>(
              //when user clicks on the image it opens the image 
              <div key={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
                <img src={url} alt="" className="h-full rounded-md"/>
              </div>
            ))
          }
        </div>
      </div>

      <button onClick={()=> logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2
      bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
      text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar