import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";    
//css for rect-toastify
import axios from "axios"

import { loginRoute } from '../utilities/APIroutes';

function Login(props) {

        const navigate = useNavigate();
        //for flashing error messages
        const toastOptions = 
        {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        };


        const [values, setValues] = useState({
            username:"",
            password: ""
        });

        //redirecting user to chat page if its logged in
        useEffect(()=>{
            if(localStorage.getItem("chatify-user"))
            {
                navigate("/")
            }
        }, [])  //to run it only the first time when compoonent renders

        const handleChange = (event)=>
        {
            //creating new object
            setValues({ ...values, [event.target.name]: event.target.value });
        }

        const handleValidation = ()=>
        {
            const {username, password} = values;
            if(username === "")
            {
                toast.error("Email and password are required", toastOptions);
                return false;
            }
            else if(password  ===  "")
            {
                toast.error("Email and password are required", toastOptions)
                return false;
            }
            return true;
        }

        const handleSubmit = async (event)=>
        {
            //avoid refresh on form submit
            event.preventDefault();
            if(handleValidation())
            {
                console.log("Validated...")
                const {  username, password } = values;
                 //send request/data to server via axios
                 //validating data
                const { data } = await axios.post(loginRoute, {
                    username,
                    password
                  });
                
                  if(data.status === false)
                  {
                    toast.error(data.msg, toastOptions);
                  }
                  if(data.status === true)
                  {
                    localStorage.setItem("chatify-user", JSON.stringify(data.user));
                    navigate("/");
                  }                  
                 
                  
            
            }
            // alert("form")

        }


    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Chatify</h1>
                    </div>
                    <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange(e)} min="3" />
                    <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)} />

                    <button type='submit'>Sign in</button>
                    <span>Don't have an account ? <Link to="/register">Sign up</Link> </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #131324;

.brand
{
    display: flex;
    align-items:center;
    gap: 1rem;
    justify-content: center;
    img
    {
        height: 5rem
    }
    h1
    {
        color: white;
        text-transform: uppercase;
    }
}

form
{
    display: flex;
    flex-direction:column;
    gap:2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input
    {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;

        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
        background-color:#997af0;
        color:white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover
        {
            background-color:#4e0eff;
        }
    }
    span
    {
        color:white;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold
        }
    }
    
}


`;

export default Login;