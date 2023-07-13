import React from 'react';
import { styled } from 'styled-components';

function InvalidRoute(props) {
    return (
        <>
        <Container>
            <h1>Page Not Found</h1>
        </Container>
        </>
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
h1
{
    color: white;
    font-size: 3rem;
}
`;
export default InvalidRoute;