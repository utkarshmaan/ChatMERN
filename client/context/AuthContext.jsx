import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const backendURL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL=backendURL;

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null)

    
    // connect socket function to handle socket connection and online user updates
    const connectSocket=(userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket = io(backendURL,{
            query:{
                userId : userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket)

        newSocket.on("getOnlineUsers", (userIds)=>{
            setOnlineUser(userIds);
        })
    }

    // check if user is authenticated and if so, set the user data and connect the socket

    const checkAuth = async ()=>{
        try {
            const { data } = await axios.get("/api/auth/check")
            if(data.success){
                // console.log("data : ", data)
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

// Login function to handle user authentication and socket connection
    const login= async (state,credentials)=>{
        try {
            const {data} = await axios.post(`/api/auth/${state}`,credentials)
            
            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
                // axios.defaults.headers.common["token"] = data.token
                setToken(data.token);
                localStorage.setItem("token",data.token)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
  }
}, [token]);


    // logout fn to handle user logout and socket disconnection
    const logout = async ()=>{
        localStorage.removeItem("token");
        setToken(null)
        setAuthUser(null);
        setOnlineUser([])
        axios.defaults.headers.common["token"] = null
        toast.success("Logged out successfully")
        socket.disconnect();

    }


    // Update user profile
    const updateProfile = async (body)=>{
        try {
            const { data } = await axios.put("/api/auth/update-profile",body)
            if(data.success){
                setAuthUser(data.user)
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }





    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkAuth();
    },[])

    const value = {
        axios,
        authUser,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}