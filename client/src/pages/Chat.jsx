import React, {useState, useEffect} from 'react';
import styled from "styled-components"
import axios from "axios"
import {useNavigate} from "react-router-dom"

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { allUsersRoute } from '../utilities/APIroutes';
import ChatContainer from '../components/ChatContainer';
function Chat(props) {

    const navigate = useNavigate()

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
                {isLoaded && currentChat ===  undefined ? <Welcome currentUser={currentUser}/> : (
                    <ChatContainer currentUser = {currentUser}/>
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
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat;