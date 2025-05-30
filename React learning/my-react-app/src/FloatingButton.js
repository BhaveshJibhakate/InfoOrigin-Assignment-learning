import React from "react";
import styled from "styled-components";
import { Draggable } from 'react-draggable';

// Styled component for the button
const StyledButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 30px;
  background-color: #007bff; /* Blue background */
  color: white;
  border: none;
  border-radius: 50%; /* Circular button */
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Floating effect */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

// Parent container with relative positioning and full height
const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;  // Makes sure we are using the full viewport height
`;

const FloatingButton = () => {
  return (
    <ParentContainer>
      <Draggable bounds="parent">
        <div>
          <StyledButton>+</StyledButton>
        </div>
      </Draggable>
    </ParentContainer>
  );
};

export default FloatingButton;
