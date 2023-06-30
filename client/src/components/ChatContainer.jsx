import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Logout from "../components/Logout"
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { getAllMessagesRoute, sendMessageRoute } from '../utilities/APIroutes';
import axios from 'axios';
function ChatContainer({currentChat, currentUser}) {

    const [messages, setMessages] = useState([]);

    //whenever current chat changes, get messages of current chat user and current user from db
    useEffect(()=>
    {
        async function getMessages()
        {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            console.log(response.data);
            setMessages(response.data.showMessages);
        }       
        getMessages();
    }, [currentChat])
    const handleSendMsg = async(msg)=>
    {   
        // console.log("inside chat")
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,

        }) 
    }

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            //this would treat base64 string as image
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt="avatar"
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>

            {/* <ChatMessages/> */}
            <div className="chat-messages">
                {
                    messages.map((msg)=>
                    {  
                        return (
                           <div>
                            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                                <div className="content">
                                    <p>
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                           </div>
                        )
                    })

                }
            </div>  
            <ChatInput handleSendMsg = {handleSendMsg}/>

        </Container>
    );
}
const Container = styled.div`
display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
    padding-top: 1rem;
    .chat-header
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details
        {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar
            {
                img
                {
                    height: 3rem;
                }
            }
            .username
            {
                h3
                {
                    color: white;
                }
            }
        }
    }
     .chat-messages
     {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message
        {
            display: flex;
            align-items: center;
            .content
            {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended
        {
            justify-content: flex-end;
            .content
            {
                background-color: #4f04ff21;
            }
        }
        .received
        {
            justify-content: flex-start;
            .content
            {
                background-color: #9900ff20;
            }
        }
     }   
        
`;
export default ChatContainer;