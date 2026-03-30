// import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// 5hr 45 min  min se start karna hai (bas hosting baki hai aur thoda bug fix and design)
function App() {
  const  {authUser}  = useContext(AuthContext);
  
  // className="bg-[url('./src/assets/bgImage.svg')] 
    // bg-contain"
  return (
    <>
    <div className="bg-white">
    <Toaster></Toaster>
      <Routes>
      
        <Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/>}></Route>
        {/* <Route path='/' element={ <Home/> }></Route> */}
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to='/'/>}></Route>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to='/login'/>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
