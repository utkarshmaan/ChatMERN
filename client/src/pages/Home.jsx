import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'
import SideNavbar from '../components/SideNavbar'

const Home = () => {
  // ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}
  const {selectedUser} = useContext(ChatContext);
  return (
    <div className='border w-full h-screen'>
      <div className={` flex
      overflow-hidden h-[100%]  relative 
      
      `}>
      {/* here goes sidenavbar */}
      <SideNavbar/>
        <Sidebar />
        <ChatContainer/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Home