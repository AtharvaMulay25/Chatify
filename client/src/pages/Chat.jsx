import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components"
import axios from "axios"
import {useNavigate} from "react-router-dom"

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { allUsersRoute, host} from '../utilities/APIroutes';
import ChatContainer from '../components/ChatContainer';

import {io} from "socket.io-client"

function Chat(props) {

    const navigate = useNavigate()
    const socket = useRef();

    const [contacts, setContacts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);    //hook to check if we get current user, and then display welcome component
    const [currentUser,setCurrentUser ] = useState(undefined);
    console.log(currentUser);
    const [currentChat, setCurrentChat] = useState(undefined);
    useEffect(()=>
    {
        async function validateAndSetUser()
        {
            //redirect to login if not logged in
            if(!localStorage.getItem("chatify-user"))
            {
                navigate("/login")
            }
            else    //set the current User if logged in
            {
               
                setCurrentUser(await JSON.parse(localStorage.getItem("chatify-user")));
                setIsLoaded(true);
            }
        }
        validateAndSetUser();
    }, [])

    useEffect(()=>{
        if(currentUser)
        {
            socket.current = io(host
            //     , {transports: ['websocket'], // Required when using Vite    
            // }
            );
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(()=>
    {
        async function fetchAllUsers()
        {
            if(currentUser)
            {
                if(currentUser.isAvatarImageSet)
                {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                }
                else
                {
                    navigate("/setAvatar")
                }
            }
        };
        fetchAllUsers();
0
    }, [currentUser])

    const handleChatChange = (chat)=>
    {
        setCurrentChat(chat);
    }
    return (
        <Container>
            <div className="container">
                
                <Contacts contacts={contacts} changeChat={handleChatChange}/>
                
                {/* //for welcome page, Isloaded should be true and currentChat should be undefined, and for chatcontainer isLoaded should be true */}
                
                {isLoaded && currentChat ===  undefined ? <Welcome currentUser={currentUser}/> : isLoaded && (
                    <ChatContainer currentChat = {currentChat} currentUser={currentUser}  socket= {socket}/>
                )}   
                
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;  
    background-color: #131324;
        @media screen  and (max-width: 720px)
         {
           overflow-y: auto;
            
        }
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
        @media screen  and (max-width: 720px) {
         
            display: flex;
            flex-direction: column-reverse;
            justify-content: space-between;
            height: 100vh;
            width: 95vw;
            
        }
    }
`;

export default Chat;