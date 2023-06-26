import React, {useState, useEffect} from 'react';
import styled from "styled-components"
import axios from "axios"
import {useNavigate} from "react-router-dom"
function Chat(props) {

    const navigate = useNavigate()

    const [contacts, setContacts] = useState([]);
    const [currentUser,setCurrentUser ] = useState(undefined);

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

    }, [currentUser])
    return (
        <Container>
            <div className="container"></div>
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