import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Logo from "../assets/logo.svg"

function Contacts({contacts, changeChat}) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [selectedChat, setSelectedChat] = useState(undefined);    //state for current selected chat

    useEffect(()=>
    {
        async function setUserProfile()
        {
            const currentUser = await JSON.parse(localStorage.getItem("chatify-user"));
            if(currentUser){
                setCurrentUserImage(currentUser.avatarImage);
                setCurrentUserName(currentUser.username);
            }
        }
        setUserProfile();
       
    }, []);

    const changeCurrentChat = (index, contact)=>
    {
        setSelectedChat(index);
        changeChat(contact);
    };

    return (
        <>
            { currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Chatify</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, ind)=>{
                                return (
                                    <div className={`contact ${ind === selectedChat ? 'selected' : ""}`} key={ind} onClick={()=>changeCurrentChat(ind, contact)}>
                                        <div className="avatar">
                                            <img
                                                // this would treat base64 string as image
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                //this would treat base64 string as image
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            ) }
        </>
       
    );
}
const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    @media screen and (max-width: 720px)
    {
        /* max-height: 40%; */
        min-height: 40%;
    }
    .brand
    {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;

        /* styling scrollbar */
        &::-webkit-scrollbar 
        {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact
        {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: 0.5s ease-in-out;
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
            @media screen and  (max-width: 720px)
            {
                min-height:3rem;
                .avatar
                {
                    img{
                        height: 2rem;
                        max-inline-size: 100%;
                    }
                }
            }
        }
        .selected
        {
            background-color: #9186f3;
        }
    }
    .current-user
    {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar
        {
            img{
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username
        {
            h2
            {
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px)
        {
            gap: 0.5rem;
            .username
            {
                h2
                {
                    font-size: 1rem;
                }
            }
            .avatar
            {
                img{
                    height: 3rem;
                    max-inline-size: 100%;
                }
            }
        }
        @media screen and (max-width: 720px)
        {
            .avatar
            {
                img{
                    height: 2rem;
                    max-inline-size: 100%;
                }
            }
        }
        
    }
`;


export default Contacts;