import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessagetime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser,sendMessage, getMessages, setShowProfile } = useContext(ChatContext)
  const {authUser,onlineUser } = useContext(AuthContext)
  const scrollEnd=useRef();

  const [input, setInput] = useState('')

  // handle sending message
  const handleSendMessage =async (e)=>{
    e.preventDefault();
    if(input.trim()==="") return null;
    await sendMessage({text: input.trim()});
    // console.log(input.trim())
    setInput("");
  }

  // Handle sending image
  const sendImage = async (e)=>{
    const file = e.target.files[0];
   
    if(!file || !file.type.startsWith('image')){
      toast.error("Select an image")
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async ()=>{
      await sendMessage({image: reader.result})
      e.target.value = ""
    }
    reader.readAsDataURL(file);
  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id);
    }
  },[selectedUser])

  useEffect(()=>{
    if( scrollEnd.current && messages ){
      scrollEnd.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])
// console.log(messages)

  return selectedUser ? (
    <div className='h-full pe-4 bg-[#060e20] overflow-scroll relative w-[60%] '>
      
      {/* Username and image area */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img onClick={()=>setSelectedUser(null) } src={assets.arrow_icon} alt="" className='cursor-pointer max-w-7'/>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" 
        onClick={()=>setShowProfile(true)}
        className='cursor-pointer w-8 rounded-full'/>
        <p className='flex-1 text-lg text-white flex items-center gap-3'>
          {selectedUser.fullName}
          {onlineUser.includes(selectedUser._id) ?
          <span className='w-3 h-3 rounded-full bg-green-500'></span>
          :
          <span className='pt-3 w-3 h-3 rounded-full bg-gray-500' ></span>
          }
        </p>
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5 cursor-pointer'/>
      </div>



      {/* Chat area */}
      <div className={`flex flex-col  h-[calc(100%-120px)] overflow-y-scroll p-3 py-6 bg-[#060e20]`} 
      // style={{backgroundImage: `url(${assets.chat_background2})`, backgroundSize: '100% 100%', backgroundRepeat: 'repeat', backgroundAttachment: 'scroll', backgroundPosition: 'center'}}
      >
        {
          messages.map((message,index)=>(
            <div key={index} className={`flex items-center gap-3 justify-end mb-8
             ${ message.senderId !== authUser._id && 'flex-row-reverse'}`}>
             
             {/* it show that if msg is image then show image  */}
                {
                  message.image ? (
                    <span className={`flex flex-col items-end p-1 bg-gradient-to-r from-[#a3a6ff] to-[#6063ee] rounded-lg ${message.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                      <img src={message.image}  alt="" className='max-w-[230px] border border-gray-700
                      rounded-lg overflow-hidden mb-4'/>
                      <p className='text-white text-xs ps-2'>{formatMessagetime(message.createdAt)}</p>
                    </span>
                  
                  ) 
                 //and if message is text then show text
                  : (<p className={`flex p-2 max-w-[200] md:text-sm font-light
                  rounded-lg  break-all  text-white
                  ${message.senderId === authUser._id ? 'rounded-br-none bg-gradient-to-r from-[#a3a6ff] to-[#6063ee]'
                  :'rounded-bl-none bg-[#1c2846cc]'}`}>{message.text}

                        <div className='flex flex-col items-center text-xs'>
                      {/* <img src={message.senderId === authUser._id?
                      authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} className='w-7 rounded-full'/> */}
                      <p className='text-white ps-2 pt-4'>{formatMessagetime( message.createdAt)}</p>
                    </div>
                  </p>
                  
                  )
                }
            
               
            </div>
          ))
        }
        <div ref={scrollEnd} >

        </div>

        {/* bottom area */}
        <div className='absolute bottom-0 left-0 right-0 flex items-center  gap-3 p-3'>
          <div className='flex-1 flex items-center bg-gray-100/12 px-3 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-full'>
            {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org">
              <path d="M12 5V19M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> */}
            <p className='text-white text-3xl'>+</p>
            <input type="text" placeholder='send a messge' 
            className='flex-1 text-lg p-3 border-none rounded-lg outline-none
            text-white placeholder-gray-400'
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              onKeyDown={(e)=>e.key === "Enter" ? handleSendMessage(e) : null}
            />
            <input type="file" id="image" accept='image/png, image/jpeg' hidden
              onChange={sendImage}
            />
              <label htmlFor='image'>
              <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer'/>
            
            </label>
          </div> 
          <img src={assets.send_button} alt="" className='w-9 cursor-pointer'
            onClick={handleSendMessage}
          />

        </div>


      </div>
    </div>
  )
  :
  (
    <div className='w-[50%] flex flex-col items-center justify-center gap-2 text-gray-500
    bg-[#060e20] max-md:hidden rounded-r-xl shadow-[10px_0_20px_rgba(0,0,0,0.1)]'>
      {/* <img src={assets.logo_icon} className='max-w-16' alt=""/> */}
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square-icon lucide-messages-square "><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg>
      <p className='text-lg text-white font-medium'>Chat anytime, anywhere</p>

    </div>
  )
}

export default ChatContainer