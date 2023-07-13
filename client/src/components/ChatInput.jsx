import React, { useState } from 'react';
import styled from "styled-components"
import Picker from "emoji-picker-react";
//for send button
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"


function ChatInput({handleSendMsg}) {

    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerShowHide = ()=>
    {
        setShowEmojiPicker(!showEmojiPicker);
    }
    //adding emoji at the end of the msg
    const handleEmojiClick = (event, emojiData)=>
    {
        let message = msg;
        // console.log(emojiData.emoji);
        message += emojiData.emoji;
        setMsg(message);
    }

    const sendChat = (event)=>
    {
        console.log(msg);
        // alert('send')
        event.preventDefault();
        if(msg.length > 0)
        {
            handleSendMsg(msg);
            setMsg("");
        }
    }

    return (
        <Container>
            {/* contains emoji icon showing */}
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerShowHide}/>
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
                </div>
            </div>

            {/* form contains input and send btn */}
            <form className="input-container" onSubmit={(event)=> sendChat(event)}>
                <input type="text" name="" id="" placeholder='Type your message here...' 
                    onChange={(e)=>setMsg(e.target.value)}
                    value={msg}
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}
const Container  = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #080420;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px)
     {
        padding: 0 1rem;
        gap: 1rem;
    }
    @media screen and (max-width: 720px)
    {
        grid-template-columns: 10% 90%;
        padding: 0 1rem;
    }
    .button-container 
    {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji
        {
            position: relative;
            svg 
            {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react 
            {
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;.emoji-scroll-wrapper::-webkit-scrollbar
                {
                    background-color: #080420;
                    width: 5px;
                    &-thumb 
                    {
                        background-color: #9a86f3;
                    }
                }

                .emoji-categories
                {
                    button 
                    {
                        filter: contrast(0);
                    }
                }
                /* .emoji-search 
                {
                    background-color: transparent;
                    border-color: #9a86f3;
                } */
                .emoji-group:before 
                {
                    background-color: #080420;
                }
                
            }
        }
       
    }
    .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      /* height: 60%; */
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px)
        {
            padding: 0.3rem 1rem;
            svg 
            {
            font-size: 1rem;
            }
        }
      svg
        {
        font-size: 2rem;
        color: white;
      }
        @media screen and (max-width: 720px)
        {
            padding: 0.6rem 2rem;
            svg 
            {
            font-size: 1.1rem;
            }
        }
    }
  }
`;
export default ChatInput;