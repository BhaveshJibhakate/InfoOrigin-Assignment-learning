import React from "react";
import styled from "styled-components";

// Create a styled component for the floating button
const FloatingButton = styled.button`
  position: fixed; /* Makes the button float on the screen */
  bottom: 20px; /* Position the button 20px from the bottom */
  right: 20px; /* Position the button 20px from the right */
  padding: 10px 20px;
  background-color: #007bff; /* Button color */
  color: white;
  border: none;
  border-radius: 50%; /* Make it circular */
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow for floating effect */
  
  &:hover {
    background-color: #0056b3; /* Darker color on hover */
  }
`;

const Floating = () => {
  return (
    <>
      <FloatingButton>+</FloatingButton>
    </>
  );
};

export default Floating;
