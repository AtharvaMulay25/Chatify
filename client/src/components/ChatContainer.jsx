import React from 'react';
import styled from "styled-components";
function ChatContainer(props) {
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                    <img
                        //this would treat base64 string as image
                        src={`data:image/svg+xml;base64,${currentUserImage}`}
                        alt="avatar"
                    />
                    </div>
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
    
`;
export default ChatContainer;