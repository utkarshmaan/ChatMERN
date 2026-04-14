import React, {createContext,useContext,useEffect,useState} from 'react'
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const ChatContext = createContext();

export const ChatProvider=({children})=>{

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    const [showProfile, setShowProfile] = useState(false);

    const {socket, axios} = useContext(AuthContext);

    // fn to get all user for sidebar
    const getUsers = async ()=>{
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.user);
                setUnseenMessages(data.unseenMessages)
                // console.log(data)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // fun to get messages for selected users
    const getMessages = async (userId)=>{
        try {
            const {data } = await axios.get(`/api/messages/${userId}`)
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // fn to send msg to selected user
    const sendMessage = async (messageData)=>{
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if(data.success){
                setMessages((prevMsg)=>[...prevMsg, data.newMessage])
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to subscribe to messages for selected user(we will get messages in real time)
    const subscribeToMessages = async()=>{
        if(!socket) return;
        
        console.log("updating messages", socket)
        socket.on("newMessage",(newMessage)=>{
            console.log("new message outside",newMessage)
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                console.log("new message",newMessage)
                setMessages((prevMessage)=>[...prevMessage, newMessage]);
                axios.put(`/api/messages/mark/${ newMessage._id }`);
            }else{
                setUnseenMessages((prevUnseenMessage)=>({
                    ...prevUnseenMessage,[newMessage.senderId] : prevUnseenMessage[newMessage.senderId] ?
                     prevUnseenMessage[newMessage.senderId] +1 : 1
                }))
            }
        })
    }

    // Function to unsubscribe from messages
    const unSubscribeFromMessages = ()=>{
        if(socket) socket.off("newMessage")
    }

    useEffect(()=>{
        subscribeToMessages();
        return ()=> unSubscribeFromMessages();
    },[socket, selectedUser])


    const value = {
        sendMessage,
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        getMessages,
        showProfile,
        setShowProfile
    }

    return (<ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>)
}